import { Component, inject, signal } from '@angular/core';
import { ArdiumIconModule, ArdiumSegmentModule } from '@ardium-ui/ui';
import { ExplorerDataService } from '@services/explorer-data/explorer-data.service';
import { ExplorerItemType } from '@typings';
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
    { value: ExplorerItemType.List, label: 'Lists', icon: 'list-alt' },
    { value: ExplorerItemType.Folder, label: 'Folders', icon: 'folder' },
  ];
  readonly suggestedType = signal<[ExplorerItemType]>([ExplorerItemType.List]);

  readonly explorerDataService = inject(ExplorerDataService);

  constructor() {
    setTimeout(() => {
      this.explorerDataService.fetchFolderContents('1');
    }, 500);
  }

  readonly testData = [
    { name: 'Test list', type: ExplorerItemType.List },
    { name: 'Test list 2', type: ExplorerItemType.List },
    { name: 'Test list 3', type: ExplorerItemType.List },
    { name: 'Test list 4', type: ExplorerItemType.List },
    { name: 'Test list 5', type: ExplorerItemType.List },
    { name: 'Test list 6', type: ExplorerItemType.List },
    { name: 'Test list 7', type: ExplorerItemType.List },
    { name: 'Test list 8', type: ExplorerItemType.List },
    { name: 'Test list 9', type: ExplorerItemType.List },
    { name: 'Test list 10', type: ExplorerItemType.List },
    { name: 'Test list 11', type: ExplorerItemType.List },
    { name: 'Test list 12', type: ExplorerItemType.List },
  ];
  readonly testData2 = [
    { name: 'Test folder', type: ExplorerItemType.Folder },
    { name: 'Test folder 2', type: ExplorerItemType.Folder },
    { name: 'Test folder 3', type: ExplorerItemType.Folder },
    { name: 'Test folder 4', type: ExplorerItemType.Folder },
    { name: 'Test folder 5', type: ExplorerItemType.Folder },
    { name: 'Test folder 6', type: ExplorerItemType.Folder },
    { name: 'Test folder 7', type: ExplorerItemType.Folder },
    { name: 'Test folder 8', type: ExplorerItemType.Folder },
    { name: 'Test folder 9', type: ExplorerItemType.Folder },
    { name: 'Test folder 10', type: ExplorerItemType.Folder },
    { name: 'Test folder 11', type: ExplorerItemType.Folder },
    { name: 'Test folder 12', type: ExplorerItemType.Folder },
  ];
}
