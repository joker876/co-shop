import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpService } from '@services/http';
import { UserInfoResponse } from '@shared/interfaces/user/user-info';
import { getSuccessRes } from '@utils/get-success';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpService);

  private readonly _myself = rxResource({
    loader: () => {
      return this.http.get<UserInfoResponse>('/user/myself').pipe(
        getSuccessRes(),
        map(res => res?.user)
      );
    },
  });

  readonly myself = this._myself.asReadonly();

  readonly isAuthenticated = computed(() => !this._myself.error());
}
