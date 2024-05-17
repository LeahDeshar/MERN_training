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

  constructor() {
    this.productService.onAddToCart$.subscribe((res: any) => {});
  }

  showCart() {
    this.isCartVisible = !this.isCartVisible;
  }
}
