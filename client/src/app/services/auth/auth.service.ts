import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from '@services/http';
import { catchError, retry, Subject, takeUntil } from 'rxjs';
import { AuthRegisterRequest, AuthRegisterResponse } from './../../../../../shared/interfaces/auth/register';

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

  private readonly _isAuthenticated = signal<boolean>(false);
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  private readonly _isRegisterPending = signal<boolean>(false);
  public readonly isRegisterPending = this._isRegisterPending.asReadonly();
  private readonly _isRLoginPending = signal<boolean>(false);
  public readonly isRLoginPending = this._isRLoginPending.asReadonly();
  private readonly _isLogoutPending = signal<boolean>(false);
  public readonly isLogoutPending = this._isLogoutPending.asReadonly();

  executeRegister(data: AuthRegisterRequest): void {
    this._isRegisterPending.set(true);
    const sub = this.http
      .post<AuthRegisterRequest, AuthRegisterResponse>('auth/register', data, {})
      .pipe(
        takeUntil(this.destroy$),
        retry(0),
        catchError((err, caught) => {
          this._isRegisterPending.set(false);
          console.log(err.error);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(res => {
        this._isRegisterPending.set(false);
        console.log(res);
      });
  }
}
