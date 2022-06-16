import { isPlatformBrowser } from '@angular/common';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { noop } from 'rxjs';

import { PunchoutIdentityProviderModule } from '../extensions/punchout/identity-provider/punchout-identity-provider.module';

import { Auth0IdentityProvider } from './identity-provider/auth0.identity-provider';
import { ICMIdentityProvider } from './identity-provider/icm.identity-provider';
import { IDENTITY_PROVIDER_IMPLEMENTOR, IdentityProviderFactory } from './identity-provider/identity-provider.factory';
import { IdentityProviderCapabilities } from './identity-provider/identity-provider.interface';
import { ApiTokenService } from './utils/api-token/api-token.service';
import { MemoryStorage } from './utils/api-token/api-token.storage';

/**
 * provider factory for storage
 * We need a factory, since localStorage is not available during AOT build time.
 */
export function storageFactory(platformId: string): OAuthStorage {
  if (isPlatformBrowser(platformId)) {
    return localStorage;
  }
}

@NgModule({
  imports: [OAuthModule.forRoot({ resourceServer: { sendAccessToken: false } }), PunchoutIdentityProviderModule],
  /* eslint-disable @angular-eslint/sort-ngmodule-metadata-arrays */
  providers: [
    { provide: OAuthStorage, useClass: MemoryStorage, deps: [PLATFORM_ID, ApiTokenService] },
    {
      provide: IDENTITY_PROVIDER_IMPLEMENTOR,
      multi: true,
      useValue: {
        type: 'ICM',
        implementor: ICMIdentityProvider,
      },
    },
    {
      provide: IDENTITY_PROVIDER_IMPLEMENTOR,
      multi: true,
      useValue: {
        type: 'auth0',
        implementor: Auth0IdentityProvider,
      },
    },
  ],
})
export class IdentityProviderModule {
  static forTesting(
    capabilities: IdentityProviderCapabilities = { editEmail: true, editPassword: true, editProfile: true }
  ): ModuleWithProviders<IdentityProviderModule> {
    return {
      ngModule: IdentityProviderModule,
      providers: [
        {
          provide: IdentityProviderFactory,
          useValue: {
            getInstance: () => ({
              init: noop,
              intercept: (req: HttpRequest<unknown>, next: HttpHandler) => next.handle(req),
              triggerLogin: () => true,
              triggerLogout: () => true,
              triggerInvite: () => true,
              getCapabilities: () => capabilities,
            }),
            getType: () => 'ICM',
          },
        },
      ],
    };
  }
}
