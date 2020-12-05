import { authorize, failAuthorize } from 'features/auth/authSlice';

import axios from 'axios';
import store from 'app/store';

export interface ServerTokenResponse {
  access_token: string;
  refresh_token: string;
  expires: number;
  token_type: string;
}

export class TokenStorage {
  private static readonly LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
  private static readonly LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';
  private static readonly LOCAL_STORAGE_TOKEN_EXPIRY = 'token_expiry';
  private static updatingToken = false;
  private static updateTokenPromise: Promise<string> | null = null;

  public static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public static getAuthenticationBearer(): string {
    return 'Bearer ' + this.getToken();
  }

  public static getNewToken(): Promise<string> {
    const getNewTokenPromise: Promise<string> = new Promise((resolve, reject): void => {
      this.updatingToken = true;
      axios
        .post<ServerTokenResponse>('/user/oauth/token', {
          refresh_token: this.getRefreshToken(),
          grant_type: 'refresh_token',
        })
        .then((response) => {
          this.updatingToken = false;
          this.storeTokens(response.data);
          resolve(response.data.access_token);
        })
        .catch((error) => {
          this.updatingToken = false;
          reject(error);
        });
    });
    this.updateTokenPromise = getNewTokenPromise;
    return getNewTokenPromise;
  }

  public static onUpdatedToken(): Promise<string> | null {
    return this.updateTokenPromise;
  }

  public static storeAccessToken(token: string): void {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN, token);
  }

  public static storeRefreshToken(refreshToken: string): void {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
  }

  public static storeAccessTokenExpiry(expiry: number): void {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN_EXPIRY, expiry.toString());
  }

  public static isTokenExpired(): boolean {
    return Date.now() - this.getAccessTokenExpiry() > 0;
  }

  public static isUpdatingToken(): boolean {
    return this.updatingToken;
  }

  public static storeTokens(tokens: ServerTokenResponse): void {
    this.storeAccessToken(tokens.access_token);
    this.storeRefreshToken(tokens.refresh_token);
    this.storeAccessTokenExpiry(Date.now() + tokens.expires * 1000);
    console.log('Storing tokens...');
    store.dispatch(authorize());
  }

  public static clear(): void {
    axios.post('/user/oauth/revoke', { token: this.getRefreshToken() }).then(() => {
      localStorage.removeItem(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
      localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN_EXPIRY);
      store.dispatch(failAuthorize());
    });
  }

  private static getRefreshToken(): string | null {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  private static getToken(): string | null {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN);
  }

  private static getAccessTokenExpiry(): number {
    const expiry = localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN_EXPIRY);
    if (expiry === null) return 0;
    return parseInt(expiry);
  }
}

// Use interceptor to inject the token to requests
axios.interceptors.request.use((request) => {
  return new Promise((resolve) => {
    if (TokenStorage.isAuthenticated() === false) return resolve(request);
    request.headers['Authorization'] = TokenStorage.getAuthenticationBearer();
    if (TokenStorage.isTokenExpired() === false) {
      return resolve(request);
    } else {
      if (request.url === '/user/oauth/token') return resolve(request);
      if (TokenStorage.isUpdatingToken() === false)
        TokenStorage.getNewToken().then(() => {
          request.headers['Authorization'] = TokenStorage.getAuthenticationBearer();
          return resolve(request);
        });
      else
        TokenStorage.onUpdatedToken()?.then(() => {
          request.headers['Authorization'] = TokenStorage.getAuthenticationBearer();
          return resolve(request);
        });
    }
  });
});
