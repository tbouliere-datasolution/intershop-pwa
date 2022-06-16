import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { ApiTokenService } from './api-token.service';

@Injectable()
export class MemoryStorage implements OAuthStorage {
  constructor(@Inject(PLATFORM_ID) private platformId: string, private apiTokenService: ApiTokenService) {}
  private data = new Map<string, string>();
  private regex = /^(access_token|expires_at)$/;

  getItem(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      if (key === 'access_token') {
        return this.apiTokenService.parseApiTokenCookie()?.apiToken ?? this.data.get(key);
      }
      return sessionStorage.getItem(key) ?? this.data.get(key);
    }
    return this.data.get(key);
  }

  removeItem(key: string): void {
    this.data.delete(key);
    if (isPlatformBrowser(this.platformId)) {
      if (this.regex.test(key)) {
        this.apiTokenService.removeApiToken();
      } else {
        sessionStorage.removeItem(key);
      }
    }
  }

  setItem(key: string, data: string): void {
    this.data.set(key, data);
    if (isPlatformBrowser(this.platformId)) {
      if (this.regex.test(key) && this.getItem('access_token') && this.getItem('expires_at')) {
        const grantType = sessionStorage.getItem('grantType');
        this.apiTokenService.setApiToken(
          this.getItem('access_token'),
          grantType === 'anonymous'
            ? 'anonymous'
            : grantType === 'client_credentials' || grantType === 'password'
            ? 'user'
            : undefined,
          {
            expires: new Date(Number(this.getItem('expires_at'))),
          }
        );
      } else {
        sessionStorage.setItem(key, data);
      }
    }
  }
}
