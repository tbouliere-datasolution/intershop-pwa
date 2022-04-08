import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, noop, take } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'ish-core/services/api/api.service';
import { UserService } from 'ish-core/services/user/user.service';
import { selectQueryParam } from 'ish-core/store/core/router';
import { logoutUser } from 'ish-core/store/customer/user';
import { ApiTokenService } from 'ish-core/utils/api-token/api-token.service';

import { IdentityProvider, TriggerReturnType } from './identity-provider.interface';

@Injectable({ providedIn: 'root' })
export class ICMIdentityProvider implements IdentityProvider {
  constructor(
    protected router: Router,
    protected store: Store,
    protected apiTokenService: ApiTokenService,
    protected apiService: ApiService,
    private userService: UserService
  ) {}

  getCapabilities() {
    return {
      editPassword: true,
      editEmail: true,
      editProfile: true,
    };
  }

  init() {
    this.fetchAnonymousUserToken();
    this.apiTokenService.restore$().subscribe(noop);

    this.apiTokenService.cookieVanishes$.subscribe(type => {
      this.fetchAnonymousUserToken();
      this.store.dispatch(logoutUser());
      if (type === 'user') {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url, messageKey: 'session_timeout' },
        });
      }
    });
  }

  triggerLogin(): TriggerReturnType {
    return true;
  }

  triggerLogout(): TriggerReturnType {
    this.fetchAnonymousUserToken();
    this.store.dispatch(logoutUser());
    return this.store.pipe(
      select(selectQueryParam('returnUrl')),
      map(returnUrl => returnUrl || '/home'),
      map(returnUrl => this.router.parseUrl(returnUrl))
    );
  }

  triggerRegister(): TriggerReturnType {
    return true;
  }

  triggerInvite(route: ActivatedRouteSnapshot): TriggerReturnType {
    return this.router.createUrlTree(['forgotPassword', 'updatePassword'], {
      queryParams: { uid: route.queryParams.uid, Hash: route.queryParams.Hash },
    });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.apiTokenService.intercept(req, next);
  }

  private fetchAnonymousUserToken() {
    this.apiTokenService
      .waitUntilRouterEventFired$()
      .pipe(
        filter(() => !this.apiTokenService.hasApiToken()),
        switchMap(() => this.userService.fetchToken('anonymous')),
        take(1)
      )
      .subscribe(tokens =>
        this.apiTokenService.setApiToken(tokens.access_token, 'anonymous', {
          expires: new Date(Date.now() + tokens.expires_in * 1000),
        })
      );
  }
}
