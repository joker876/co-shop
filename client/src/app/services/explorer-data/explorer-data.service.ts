import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpService } from '@services/http';
import { FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { getSuccessRes } from '@utils/get-success';

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
        .pipe(getSuccessRes());
    },
  });

  readonly lists = computed(() => this._folderContents.value()?.lists ?? []);
  readonly folders = computed(() => this._folderContents.value()?.folders ?? []);
}
