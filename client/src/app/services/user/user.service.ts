import { effect, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpService } from '@services/http';
import { UserInfoResponse } from '@shared/interfaces/user/user-info';
import { getSuccessRes } from '@utils/get-success';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpService);

  private readonly _user = rxResource({
    loader: () => {
      return this.http.get<UserInfoResponse>('/user/myself').pipe(getSuccessRes());
    },
  });

  cdfd = effect(() => {
    console.log('user', this._user.value());
  });
}
