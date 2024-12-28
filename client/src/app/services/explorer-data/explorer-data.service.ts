import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpService } from '@services/http';
import { FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { mapResource } from '@utils/map-resource';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplorerDataService {
  private readonly http = inject(HttpService);

  private readonly currentFolderId = signal<string | null>(null);

  private readonly _folderContents = rxResource({
    request: () => ({ folderId: this.currentFolderId() ?? '' }),
    loader: ({ request }) => {
      return this.http
        .get<FolderContentsResponse>('/explorer-data/folder-contents', {
          params: { parentFolderId: request.folderId ?? '' },
        })
        .pipe(
          map(v => {
            if (v?.success) {
              console.log(v.lists[2]);
              return mapResource(v)
                ?.mapArray('lists', l => l.mapDate('date').return())
                .return();
            }
            return null;
          })
        );
    },
  });

  readonly lists = computed(() => this._folderContents.value()?.lists ?? []);
  readonly folders = computed(() => this._folderContents.value()?.folders ?? []);
}
