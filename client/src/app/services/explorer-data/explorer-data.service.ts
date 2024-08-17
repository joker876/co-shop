import { inject, Injectable } from '@angular/core';
import { HttpService } from '@services/http';
import { catchError, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplorerDataService {
  private readonly http = inject(HttpService);

  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchFolderContents(parentFolderId: string = '') {
    const sub = this.http
      .get('/explorer-data/folder-contents', { params: { parentFolderId: parentFolderId } })
      .pipe(
        takeUntil(this.destroy$),
        catchError((err, caught) => {
          console.error(err);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
