import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Folder } from '@shared/interfaces/folder/folder';
import { List } from '@shared/interfaces/list/list';
import { ExplorerItemType } from '@typings';
import { ExplorerItemComponent } from "./explorer-item/explorer-item.component";

@Component({
  selector: 'app-explorer-list',
  imports: [ExplorerItemComponent, DatePipe],
  templateUrl: './explorer-list.component.html',
  styleUrl: './explorer-list.component.scss',
})
export class ExplorerListComponent {
  readonly type = input.required<ExplorerItemType>();

  readonly isFolder = computed(() => this.type() === ExplorerItemType.Folder);

  readonly lists = input.required<List[]>();
  readonly folders = input.required<Folder[]>();

  getItemAdditionalInfo(item: List | Folder) {
    if (this.isFolder()) {
      return '';
    }
    return ``;
  }
}
