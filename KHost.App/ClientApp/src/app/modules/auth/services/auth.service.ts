import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthUser } from '../models/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _config: AuthConfig, private _localStorageService: LocalStorageService) { }

  public login(): boolean {
    return false;
  }

  public isAuthenticated(): boolean {
    return false;
  }

  public isAuthorized(): boolean {
    return false;
  }

  public getUser(): AuthUser | null {
    return null;
  }

  public getLoginUrl(): string {
    return this._config.loginUrl ?? '';
  }
}

export class AuthConfig {
  loginUrl: string = '';

  constructor(init?:Partial<AuthConfig>) {
    Object.assign(this, init);
  }
}