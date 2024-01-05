import { Component, OnInit } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import {
  ProductsAPIActions,
  ProductsPageActions,
} from '../state/products.actions';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$ = this.store.select((state: any) => state.products.products);
  total = 0;
  loading$ = this.store.select((state: any) => state.products.loading);
  showProductCode$ = this.store.select(
    (state: any) => state.products.showProductCode,
  );
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(
          ProductsAPIActions.productsLoadedSuccess({ products }),
        );
        this.total = sumProducts(products);
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
