import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpService } from '@services/http';
import { catchError, retry, Subject, takeUntil } from 'rxjs';
import { isDefined } from 'simple-bool';
import { AuthLoginRequest, AuthLoginResponse } from '../../../../../shared/interfaces/auth/login';
import { UserInfo } from '../../../../../shared/interfaces/user/user-info';
import {
  AuthRegisterStep1Request,
  AuthRegisterStep1Response,
  AuthRegisterStep2Request,
  AuthRegisterStep2Response,
} from './../../../../../shared/interfaces/auth/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpService);

  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readonly _userInfo = signal<UserInfo | null>(null);
  public readonly userInfo = this._userInfo.asReadonly();
  public readonly isAuthenticated = computed(() => isDefined(this.userInfo()));

  private readonly _isRegisterPending = signal<boolean>(false);
  public readonly isRegisterPending = this._isRegisterPending.asReadonly();
  private readonly _isLoginPending = signal<boolean>(false);
  public readonly isLoginPending = this._isLoginPending.asReadonly();
  private readonly _isLogoutPending = signal<boolean>(false);
  public readonly isLogoutPending = this._isLogoutPending.asReadonly();

  private readonly _registerErrorResponse = signal<string | null>(null);
  public readonly registerErrorResponse = this._registerErrorResponse.asReadonly();
  private readonly _loginErrorResponse = signal<string | null>(null);
  public readonly loginErrorResponse = this._loginErrorResponse.asReadonly();
  private readonly _logoutErrorResponse = signal<string | null>(null);
  public readonly logoutErrorResponse = this._logoutErrorResponse.asReadonly();

  executeRegisterStep1(data: AuthRegisterStep1Request): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.isRegisterPending()) return resolve(true);

      this._isRegisterPending.set(true);
      const sub = this.http
        .post<AuthRegisterStep1Request, AuthRegisterStep1Response>('auth/register/step1', data, {})
        .pipe(
          takeUntil(this.destroy$),
          retry(0),
          catchError((err, caught) => {
            this._isRegisterPending.set(false);
            this._registerErrorResponse.set(err.error);
            console.log(err.error, caught);
            sub.unsubscribe();
            resolve(false);
            return caught;
          })
        )
        .subscribe(res => {
          console.log(res);
          this._isRegisterPending.set(false);

          if (res.success) {
            this._userInfo.set(res.user as UserInfo);
            resolve(true);
          }
        });
    });
  }
  executeRegisterStep2(data: AuthRegisterStep2Request): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.isRegisterPending()) return resolve(true);

      this._isRegisterPending.set(true);
      const sub = this.http
        .post<AuthRegisterStep2Request, AuthRegisterStep2Response>('auth/register/step2', data, {})
        .pipe(
          takeUntil(this.destroy$),
          retry(0),
          catchError((err, caught) => {
            this._isRegisterPending.set(false);
            this._registerErrorResponse.set(err.error);
            console.log(err.error, caught);
            sub.unsubscribe();
            resolve(false);
            return caught;
          })
        )
        .subscribe(res => {
          console.log(res);
          this._isRegisterPending.set(false);

          if (res.success) {
            this._userInfo.update(curr => ({ ...curr, ...(res.user as UserInfo) }));
            resolve(true);
          }
        });
    });
  }
  executeLogin(data: AuthLoginRequest): Promise<{ isOk: boolean; hasNameSet?: boolean }> {
    return new Promise<{ isOk: boolean; hasNameSet?: boolean }>(resolve => {
      if (this.isLoginPending()) return resolve({ isOk: true });

      this._isLoginPending.set(true);
      const sub = this.http
        .post<AuthLoginRequest, AuthLoginResponse>('auth/login', data, {})
        .pipe(
          takeUntil(this.destroy$),
          retry(0),
          catchError((err, caught) => {
            this._isLoginPending.set(false);
            this._loginErrorResponse.set(err.error);
            console.log(err.error, caught);
            sub.unsubscribe();
            resolve({ isOk: false });
            return caught;
          })
        )
        .subscribe(res => {
          console.log(res);
          this._isLoginPending.set(false);

          if (res.success) {
            this._userInfo.set(res.user as UserInfo);
            resolve({ isOk: true, hasNameSet: !!res.user.username });
          }
        });
    });
  }
}
