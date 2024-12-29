import { inject, Injectable } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http';
import { List } from '@shared/interfaces/list/list';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly http = inject(HttpService);
  private readonly route = inject(ActivatedRoute);

  private readonly _currentListId = toSignal<string | undefined>(this.route.params.pipe(map(v => v['listId'])));

  readonly listData = rxResource({
    request: () => ({ listId: this._currentListId() }),
    loader: ({ request }) => {
      if (!request.listId) {
        const subject = new BehaviorSubject<null>(null);
        subject.complete();
        return subject.asObservable();
      }
      return this.http.get<List>(`/list/${request.listId}`);
    },
  });
}
