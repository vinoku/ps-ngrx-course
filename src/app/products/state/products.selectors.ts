import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { sumProducts } from '../../utils/sum-products';

export const selectProductState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (productsState) => productsState.products,
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (productsState) => productsState.loading,
);

export const selectProductsShowProductCode = createSelector(
  selectProductState,
  (productsState) => productsState.showProductCode,
);

export const selectProductsTotal = createSelector(
  selectProducts,
  sumProducts, // the same as: (products) => sumProducts(products);
);

export const selectProductsErrorMessage = createSelector(
  selectProductState,
  (productsState) => productsState.errorMessage,
);
