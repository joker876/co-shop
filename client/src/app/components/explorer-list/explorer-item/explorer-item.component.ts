import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { ExplorerItemType } from '@typings';

@Component({
  selector: 'app-explorer-item',
  imports: [CommonModule, ArdiumIconModule, ArdiumIconButtonModule, MatMenuModule],
  templateUrl: './explorer-item.component.html',
  styleUrl: './explorer-item.component.scss',
})
export class ExplorerItemComponent {
  readonly name = input.required<string>();

  readonly type = input.required<ExplorerItemType>();

  readonly deleteEvent = output<void>({ alias: 'delete' });
}
