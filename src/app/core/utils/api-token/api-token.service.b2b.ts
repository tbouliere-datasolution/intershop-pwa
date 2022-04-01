import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CookieOptions } from 'express';
import { isEqual } from 'lodash-es';
import { Observable, ReplaySubject, Subject, combineLatest, of, race, take, throwError, timer } from 'rxjs';
import { catchError, concatMap, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'ish-core/services/api/api.service';
import { getCurrentBasket, getCurrentBasketId, loadBasketByAPIToken } from 'ish-core/store/customer/basket';
import { getOrder, getSelectedOrderId, loadOrderByAPIToken } from 'ish-core/store/customer/orders';
import { getLoggedInUser, getUserAuthorized, loadUserByAPIToken } from 'ish-core/store/customer/user';
import { CookiesService } from 'ish-core/utils/cookies/cookies.service';
import { log } from 'ish-core/utils/dev/operators';
import { whenTruthy } from 'ish-core/utils/operators';

type ApiTokenCookieType = 'user' | 'basket' | 'order' | 'anonymous';

interface ApiTokenCookie {
  apiToken: string;
  type: ApiTokenCookieType;
  options?: CookieOptions;
  orderId?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiTokenService {
  apiToken$ = new ReplaySubject<ApiTokenCookie>(1);
  cookieVanishes$ = new Subject<ApiTokenCookieType>();

  private initialCookie$: Observable<ApiTokenCookie>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router,
    private cookiesService: CookiesService,
    private store: Store
  ) {
    this.initialCookie$ = of(isPlatformBrowser(platformId) ? this.parseCookie() : undefined);
    this.initialCookie$.subscribe(token => {
      this.apiToken$.next(token);
    });

    combineLatest([
      store.pipe(select(getLoggedInUser)),
      store.pipe(select(getCurrentBasket)),
      store.pipe(select(getSelectedOrderId)),
      this.apiToken$,
    ])
      .pipe(
        map(([user, basket, orderId, apiToken]): ApiTokenCookie => {
          if (user) {
            return { ...apiToken, type: 'user' };
          }
          if (basket) {
            return { ...apiToken, type: 'basket' };
          }
          if (orderId) {
            return { ...apiToken, type: 'order', orderId };
          }
          if (apiToken) {
            return apiToken;
          }
        }),
        distinctUntilChanged<ApiTokenCookie>(isEqual),
        log('apiToken changed')
      )
      .subscribe(apiToken => {
        const cookieContent = apiToken?.apiToken ? JSON.stringify(apiToken) : undefined;
        if (cookieContent) {
          if (cookieContent !== cookiesService.get('apiToken')) {
            cookiesService.put('apiToken', cookieContent, {
              expires: new Date(Date.now() + 3600000),
              secure: true,
              sameSite: 'Strict',
            });
          }
        } else {
          cookiesService.remove('apiToken');
        }
      });
  }

  private parseCookie() {
    const cookieContent = this.cookiesService.get('apiToken');
    if (cookieContent) {
      try {
        return JSON.parse(cookieContent);
      } catch (err) {
        // ignore
      }
    }
    return;
  }

  hasUserApiTokenCookie() {
    return false;
  }

  restore$(types: ApiTokenCookieType[] = ['user', 'basket', 'order', 'anonymous']): Observable<boolean> {
    return this.waitUntilRouterEventFired$().pipe(
      switchMap(() => this.initialCookie$),
      switchMap(cookie => {
        if (types.includes(cookie?.type)) {
          switch (cookie?.type) {
            case 'user': {
              this.store.dispatch(loadUserByAPIToken());
              return race(
                this.store.pipe(select(getUserAuthorized), whenTruthy(), take(1)),
                timer(5000).pipe(map(() => false))
              );
            }
            case 'basket':
              this.store.dispatch(loadBasketByAPIToken({ apiToken: cookie.apiToken }));
              return race(
                this.store.pipe(
                  select(getCurrentBasketId),
                  whenTruthy(),
                  take(1),
                  map(() => true)
                ),
                timer(5000).pipe(map(() => false))
              );
            case 'order': {
              this.store.dispatch(loadOrderByAPIToken({ orderId: cookie.orderId, apiToken: cookie.apiToken }));
              return race(
                this.store.pipe(
                  select(getOrder(cookie.orderId)),
                  whenTruthy(),
                  take(1),
                  map(() => true)
                ),
                timer(5000).pipe(map(() => false))
              );
            }
          }
        }
        return of(true);
      })
    );
  }

  waitUntilRouterEventFired$(): Observable<boolean> {
    if (isPlatformServer(this.platformId)) {
      return of(true);
    }
    return this.router.events.pipe(
      first(),
      switchMap(() => of(true))
    );
  }

  setApiToken(apiToken: string, type: ApiTokenCookieType, options?: CookieOptions) {
    if (!apiToken) {
      console.warn('do not use setApiToken to unset token, use remove or invalidate instead');
    }
    this.apiToken$.next({ apiToken, type, options });
  }

  removeApiToken() {
    this.apiToken$.next(undefined);
  }

  hasApiToken(): boolean {
    return !!this.cookiesService.get('apiToken');
  }

  private invalidateApiToken() {
    this.removeApiToken();
  }

  private isAuthTokenError(err: unknown) {
    return (
      err instanceof HttpErrorResponse && typeof err.error === 'string' && err.error.includes('AuthenticationToken')
    );
  }

  private appendAuthentication(req: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    return this.apiToken$.pipe(
      map(apiToken =>
        apiToken && !req.headers?.has(ApiService.AUTHORIZATION_HEADER_KEY)
          ? req.clone({ headers: req.headers.set(ApiService.TOKEN_HEADER_KEY, apiToken?.apiToken) })
          : req
      ),
      first()
    );
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.appendAuthentication(req).pipe(
      concatMap(request =>
        next.handle(request).pipe(
          catchError(err => {
            if (this.isAuthTokenError(err)) {
              this.invalidateApiToken();

              // retry request without auth token
              const retryRequest = request.clone({ headers: request.headers.delete(ApiService.TOKEN_HEADER_KEY) });
              // timer introduced for testability
              return timer(500).pipe(switchMap(() => next.handle(retryRequest)));
            }
            return throwError(() => err);
          })
        )
      )
    );
  }
}
