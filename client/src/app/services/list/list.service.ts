import { inject, Injectable } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http';
import { ListSuccessResponse } from '@shared/interfaces/list/list';
import { getSuccessRes } from '@utils/get-success';
import { BehaviorSubject, map } from 'rxjs';
import { SetCheckedRequest } from './../../../../../shared/interfaces/product/set-checked';

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
      return this.http.get<ListSuccessResponse>(`/list/${request.listId}`).pipe(getSuccessRes());
    },
  });

  toggleProductChecked(productId: number, forcedStatus?: boolean) {
    const product = this.listData.value()?.products.find(p => p.id === productId);
    if (!product) return;

    const newStatus = forcedStatus ?? !product.checked;
    const newProduct = { ...product, checked: newStatus };

    this.listData.update(v => ({
      ...v!,
      products: v!.products.map(p => (p.id === productId ? newProduct : p)),
    }));

    this.http.post<SetCheckedRequest>('/product/set-checked', { productId, checked: newStatus }).subscribe({
      error: () => {
        this.listData.update(v => ({
          ...v!,
          products: v!.products.map(p => (p.id === productId ? product : p)),
        }));
      },
    });
  }
}
