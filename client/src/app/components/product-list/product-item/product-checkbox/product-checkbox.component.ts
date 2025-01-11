import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconCheck } from 'src/app/components/icons/check.icon';

@Component({
  selector: 'app-product-checkbox',
  imports: [IconCheck],
  templateUrl: './product-checkbox.component.html',
  styleUrl: './product-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCheckboxComponent {
  readonly checked = input<boolean>(false);
}
