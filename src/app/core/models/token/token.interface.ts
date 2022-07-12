export type FetchTokenOptions<T extends GrantType> = T extends 'password'
  ? FetchTokenPasswordOptions
  : T extends 'client_credentials'
  ? FetchTokenClientCredentialsOptions
  : FetchTokenRefreshTokenOptions;

interface FetchTokenPasswordOptions {
  username: string;
  password: string;
  organization?: string;
}

interface FetchTokenClientCredentialsOptions {
  username: string;
  password: string;
  organization?: string;
}

interface FetchTokenRefreshTokenOptions {
  refresh_token: string;
}

export type GrantType = 'anonymous' | 'password' | 'client_credentials' | 'refresh_token';

export interface TokenData {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
}
