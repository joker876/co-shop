import { Component, input } from '@angular/core';
import { Product } from '@shared/interfaces/product/product';
import { AddProductButtonComponent } from "./add-product-button/add-product-button.component";
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent, AddProductButtonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  readonly products = input.required<Product[]>();

  readonly compact = input<boolean>(false);
}
