import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  productService = inject(ProductService);
  isCartVisible: boolean = false;
  cartItems: any[] = [];

  constructor() {
    this.productService.onAddToCart$.subscribe((res: any) => {
      this.cartItems.unshift(res);
    });
  }
  removeProduct(index: number) {
    this.cartItems.splice(index, 1);
  }

  showCart() {
    this.isCartVisible = !this.isCartVisible;
  }
}
