import { TokenData } from './token.interface';
import { Token } from './token.model';

export class TokenMapper {
  static fromData(data: TokenData): Token {
    if (data) {
      return {
        idToken: data.id_token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        refreshExpiresIn: data.refresh_expires_in,
        type: data.token_type,
      };
    }
  }
}
