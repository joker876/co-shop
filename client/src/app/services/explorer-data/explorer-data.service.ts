import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpService } from '@services/http';
import { FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { mapResource } from '@utils/map-resource';

@Injectable({
  providedIn: 'root',
})
export class ExplorerDataService {
  private readonly http = inject(HttpService);

  private readonly currentFolderId = signal<string | null>(null);

  private readonly _folderContents = rxResource<FolderContentsResponse, { folderId: string }>({
    request: () => ({ folderId: this.currentFolderId() ?? '' }),
    loader: ({ request }) => {
      return this.http.get('/explorer-data/folder-contents', {
        params: { parentFolderId: request.folderId ?? '' },
      });
    },
  });

  private readonly _successfulValue = computed(() => {
    const v = this._folderContents.value();
    if (v?.success) {
      return mapResource(v)
        .mapArray('lists', l => l.mapDate('date').return())
        .return();
    }
    return null;
  });

  readonly lists = computed(() => this._successfulValue()?.lists ?? []);
  readonly folders = computed(() => this._successfulValue()?.folders ?? []);
}
