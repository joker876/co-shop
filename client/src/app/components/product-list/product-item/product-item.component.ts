import { Component, inject, input } from '@angular/core';
import { ListService } from '@services/list/list.service';
import { Product } from '@shared/interfaces/product/product';
import { ProductAmountPipe } from 'src/app/pipes/product-amount';
import { ProductCheckboxComponent } from './product-checkbox/product-checkbox.component';

@Component({
  selector: 'app-product-item',
  imports: [ProductAmountPipe, ProductCheckboxComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  readonly listService = inject(ListService);
  
  readonly product = input.required<Product>();


}
