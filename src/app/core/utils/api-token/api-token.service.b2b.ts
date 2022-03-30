import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CookieOptions } from 'express';
import { Observable, ReplaySubject, Subject, combineLatest, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, distinctUntilChanged, first, map, skip, switchMap } from 'rxjs/operators';

import { ApiService } from 'ish-core/services/api/api.service';
import { getLoggedInUser } from 'ish-core/store/customer/user';
import { CookiesService } from 'ish-core/utils/cookies/cookies.service';

type ApiTokenCookieType = 'user' | 'basket' | 'order' | 'anonymous';

interface ApiTokenCookie {
  apiToken: string;
  type: ApiTokenCookieType;
  options?: CookieOptions;
}

@Injectable({ providedIn: 'root' })
export class ApiTokenService {
  apiToken$ = new ReplaySubject<ApiTokenCookie>(1);
  cookieVanishes$ = new Subject<ApiTokenCookieType>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router,
    private cookiesService: CookiesService,
    private store: Store
  ) {
    this.apiToken$.next(isPlatformBrowser(platformId) ? this.parseCookie() : undefined);

    combineLatest([this.store.pipe(select(getLoggedInUser)), this.apiToken$.pipe(skip(1))])
      .pipe(
        map(([user, apiToken]): ApiTokenCookie => {
          if (user) {
            return { ...apiToken, type: 'user' };
          }
          return apiToken;
        }),
        distinctUntilChanged()
      )
      .subscribe(apiToken => {
        const cookieContent = apiToken?.apiToken ? JSON.stringify(apiToken) : undefined;
        if (cookieContent) {
          cookiesService.put('apiToken', cookieContent, {
            expires: new Date(Date.now() + 3600000),
            secure: true,
            sameSite: 'Strict',
          });
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

  restore$(types: ApiTokenCookieType[] = ['user', 'anonymous']): Observable<boolean> {
    return this.waitUntilRouterEventFired$();
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
