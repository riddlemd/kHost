import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { User } from 'src/app/models/User';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthUser } from '../models/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static AuthenticatedUserLocalStorageKey: string = 'authenticatedUser';

  constructor(
    private _config: AppConfig,
    private _localStorageService: LocalStorageService,
    private _httpClient: HttpClient
  ) { 

  }

  public async authenticate<TUser extends AuthUser>(identifier: string, password: string): Promise<boolean> {

    const url = `${this._config.apiUrl}${this._config.AuthConfig.authorizationUrl}`;

    const data: any = {};
    data[this._config.AuthConfig.identifierFieldName] = identifier;
    data[this._config.AuthConfig.passwordFieldName] = password;

    try {
      const response: any = await this._httpClient.post(url, data).toPromise();
      const user: TUser | undefined = response?.user;

      if(user?.accessKey) {
        this._localStorageService.write(AuthService.AuthenticatedUserLocalStorageKey, user);
        return true;
      }
    }
    catch (e) {
      // Do nothing.
    }

    return false;
  }

  public async deauthenticate(): Promise<boolean> {
    this._localStorageService.remove(AuthService.AuthenticatedUserLocalStorageKey);
    return true;
  }

  public isAuthenticated(): boolean {
    return this.getAuthenticatedUser() !== undefined;
  }

  public getAuthenticatedUser(): AuthUser | undefined {
    return this._localStorageService.read<AuthUser>(AuthService.AuthenticatedUserLocalStorageKey);
  }

  public getLoginUrl(): string {
    return this._config.AuthConfig.loginUrl;
  }

  public getNotAuthorizedUrl(): string {
    return this._config.AuthConfig.notAuthorizedUrl;
  }
}