import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ArdiumIconModule } from '@ardium-ui/ui';
import { ListExplorerItemType } from '@typings';

@Component({
  selector: 'app-main-page-explorer-item',
  standalone: true,
  imports: [CommonModule, ArdiumIconModule, DecimalPipe],
  templateUrl: './main-page-explorer-item.component.html',
  styleUrl: './main-page-explorer-item.component.scss'
})
export class MainPageExplorerItemComponent {
  readonly name = input.required<string>();
  
  readonly type = input.required<ListExplorerItemType>();
}
