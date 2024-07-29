import { Component, input } from '@angular/core';
import { ArdiumIconModule } from '@ardium-ui/ui';
import { ListExplorerItemType } from '@typings';

@Component({
  selector: 'app-quick-create-button',
  standalone: true,
  imports: [ArdiumIconModule],
  templateUrl: './quick-create-button.component.html',
  styleUrl: './quick-create-button.component.scss',
})
export class QuickCreateButtonComponent {
  readonly type = input.required<ListExplorerItemType>();
}
