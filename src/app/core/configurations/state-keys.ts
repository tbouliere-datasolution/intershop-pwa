import { makeStateKey } from '@angular/platform-browser';

export const REQUEST_TIMEOUT_ENABLED = makeStateKey<boolean>('requestTimeoutEnabled');

export const DEFAULT_REQUEST_TIMEOUT = makeStateKey<number>('defaultRequestTimeout');

export const DISPLAY_VERSION = makeStateKey<string>('displayVersion');

export const COOKIE_CONSENT_VERSION = makeStateKey<number>('cookieConsentVersion');

export const SSR_LOCALE = makeStateKey<string>('ssrLocale');
