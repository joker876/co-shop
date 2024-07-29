import { Component } from '@angular/core';
import { ListExplorerItemType, MainPageExplorerItemComponent } from 'src/app/components/main-page-explorer-item';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainPageExplorerItemComponent],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss'
})
export class MainPage {
  readonly testData = [
    { name: 'Test list', type: ListExplorerItemType.List },
    { name: 'Test list 2', type: ListExplorerItemType.List },
    { name: 'Test list 3', type: ListExplorerItemType.List },
    { name: 'Test list 4', type: ListExplorerItemType.List },
  ];
  readonly testData2 = [
    { name: 'Test list', type: ListExplorerItemType.Folder },
    { name: 'Test list 2', type: ListExplorerItemType.List },
    { name: 'Test list 3', type: ListExplorerItemType.Folder },
    { name: 'Test list 4', type: ListExplorerItemType.List },
  ];
  readonly testData3 = [
    { name: 'Test list', type: ListExplorerItemType.List },
    { name: 'Test list 2', type: ListExplorerItemType.List },
    { name: 'Test list 3', type: ListExplorerItemType.List },
    { name: 'Test list 4', type: ListExplorerItemType.Folder },
  ];
}
