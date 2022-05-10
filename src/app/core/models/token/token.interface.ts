export type FetchTokenOptions<T extends GrantType> = T extends 'password'
  ? FetchTokenPasswordOptions
  : T extends 'clientCredentials'
  ? FetchTokenClientCredentialsOptions
  : FetchTokenRefreshOptions;

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

interface FetchTokenRefreshOptions {
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
