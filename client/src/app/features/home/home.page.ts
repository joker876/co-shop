import { Component, inject, signal } from '@angular/core';
import { ArdiumIconModule, ArdiumSegmentModule } from '@ardium-ui/ui';
import { ExplorerDataService } from '@services/explorer-data/explorer-data.service';
import { ExplorerItemType } from '@typings';
import { ExplorerItemComponent } from 'src/app/components/explorer-item';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ExplorerItemComponent, ArdiumSegmentModule, ArdiumIconModule],
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
}
