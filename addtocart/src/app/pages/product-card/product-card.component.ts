import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: any;

  getDiscountedPrice(product: any) {
    const totalValue = product.price * ((100 - product.discount) / 100);
    return totalValue.toFixed(0);
  }
}
