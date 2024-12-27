import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpService } from '@services/http';
import { FolderContentsResponse } from '@shared/interfaces/explorer-data/folder-contents';
import { Folder } from '@shared/interfaces/folder/folder';
import { List } from '@shared/interfaces/list/list';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExplorerDataService {
  private readonly http = inject(HttpService);

  constructor() {
    effect(() => {
      const folderId = this.currentFolderId();
      this._fetchFolderContents(folderId ?? '');
    });
  }

  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readonly currentFolderId = signal<string | null>(null);

  private readonly _folders = signal<Folder[]>([]);
  public readonly folders = this._folders.asReadonly();

  private readonly _lists = signal<List[]>([]);
  public readonly lists = computed(() =>
    this._lists().map(v => ({
      ...v,
      date: v.date && new Date(v.date),
    }))
  );

  private _fetchFolderContents(parentFolderId: string = '') {
    this.http
      .get<FolderContentsResponse>('/explorer-data/folder-contents', { params: { parentFolderId: parentFolderId } })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (!res.success) return;
          this._folders.set(res.folders);
          this._lists.set(res.lists);
        },
        error: err => {
          console.error(err);
        },
      });
  }
}
