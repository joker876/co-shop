import { Component, inject, signal } from '@angular/core';
import { ArdiumIconModule, ArdiumSegmentModule } from '@ardium-ui/ui';
import { ExplorerDataService } from '@services/explorer-data/explorer-data.service';
import { ListExplorerItemType } from '@typings';
import { ExplorerItemComponent } from 'src/app/components/explorer-item';
import { QuickCreateButtonComponent } from 'src/app/components/quick-create-button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ExplorerItemComponent, QuickCreateButtonComponent, ArdiumSegmentModule, ArdiumIconModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly suggestedOptions = [
    { value: ListExplorerItemType.List, label: 'Lists', icon: 'list-alt' },
    { value: ListExplorerItemType.Folder, label: 'Folders', icon: 'folder' },
  ];
  readonly suggestedType = signal<[ListExplorerItemType]>([ListExplorerItemType.List]);

  readonly explorerDataService = inject(ExplorerDataService);

  constructor() {
    setTimeout(() => {
      this.explorerDataService.fetchFolderContents();
    }, 2000);
  }

  readonly testData = [
    { name: 'Test list', type: ListExplorerItemType.List },
    { name: 'Test list 2', type: ListExplorerItemType.List },
    { name: 'Test list 3', type: ListExplorerItemType.List },
    { name: 'Test list 4', type: ListExplorerItemType.List },
    { name: 'Test list 5', type: ListExplorerItemType.List },
    { name: 'Test list 6', type: ListExplorerItemType.List },
    { name: 'Test list 7', type: ListExplorerItemType.List },
    { name: 'Test list 8', type: ListExplorerItemType.List },
    { name: 'Test list 9', type: ListExplorerItemType.List },
    { name: 'Test list 10', type: ListExplorerItemType.List },
    { name: 'Test list 11', type: ListExplorerItemType.List },
    { name: 'Test list 12', type: ListExplorerItemType.List },
  ];
  readonly testData2 = [
    { name: 'Test folder', type: ListExplorerItemType.Folder },
    { name: 'Test folder 2', type: ListExplorerItemType.Folder },
    { name: 'Test folder 3', type: ListExplorerItemType.Folder },
    { name: 'Test folder 4', type: ListExplorerItemType.Folder },
    { name: 'Test folder 5', type: ListExplorerItemType.Folder },
    { name: 'Test folder 6', type: ListExplorerItemType.Folder },
    { name: 'Test folder 7', type: ListExplorerItemType.Folder },
    { name: 'Test folder 8', type: ListExplorerItemType.Folder },
    { name: 'Test folder 9', type: ListExplorerItemType.Folder },
    { name: 'Test folder 10', type: ListExplorerItemType.Folder },
    { name: 'Test folder 11', type: ListExplorerItemType.Folder },
    { name: 'Test folder 12', type: ListExplorerItemType.Folder },
  ];
}
