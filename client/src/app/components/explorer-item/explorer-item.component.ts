import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ArdiumIconModule } from '@ardium-ui/ui';
import { ListExplorerItemType } from '@typings';

@Component({
  selector: 'app-explorer-item',
  standalone: true,
  imports: [CommonModule, ArdiumIconModule, DecimalPipe],
  templateUrl: './explorer-item.component.html',
  styleUrl: './explorer-item.component.scss'
})
export class ExplorerItemComponent {
  readonly name = input.required<string>();
  
  readonly type = input.required<ListExplorerItemType>();
}
