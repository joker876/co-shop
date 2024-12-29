import { Component, computed, input, output } from '@angular/core';
import { Folder } from '@shared/interfaces/folder/folder';
import { List } from '@shared/interfaces/list/list';
import { ExplorerItemType } from '@typings';
import { SmartDatePipe } from 'src/app/pipes/smart-date';
import { ExplorerItemComponent } from './explorer-item/explorer-item.component';

@Component({
  selector: 'app-explorer-list',
  imports: [ExplorerItemComponent, SmartDatePipe],
  templateUrl: './explorer-list.component.html',
  styleUrl: './explorer-list.component.scss',
})
export class ExplorerListComponent {
  readonly type = input.required<ExplorerItemType>();

  readonly isFolder = computed(() => this.type() === ExplorerItemType.Folder);

  readonly lists = input.required<List[]>();
  readonly folders = input.required<Folder[]>();

  readonly listClick = output<List>();
  readonly listDelete = output<List>();

  onListClick(list: List) {
    this.listClick.emit(list);
  }
  onListDelete(list: List) {
    this.listDelete.emit(list);
  }
}
