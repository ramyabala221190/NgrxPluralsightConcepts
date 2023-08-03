import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getErrorMessage, getProducts, getShowProductCode } from '../state';
import {ProductPageActions,ProductApiActions} from '../state/actions';


@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  constructor(private store:Store<State>) { }

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$:Observable<Product[]>;
  selectedProduct$: Observable<Product | null>;

  ngOnInit(): void {
    this.products$=this.store.select(getProducts);
    this.displayCode$=this.store.select(getShowProductCode);
    this.errorMessage$=this.store.select(getErrorMessage);
    this.selectedProduct$=this.store.select(getCurrentProduct);
    this.store.dispatch(ProductPageActions.getProducts()); 
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCodeDisplay())
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initialiseCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({currentProductId:product.id}))
  }

  deleteProduct(product: Product){
    this.store.dispatch(ProductPageActions.deleteProduct({currentProductId:product.id}));
  }

  createProduct(product:Product){
    this.store.dispatch(ProductPageActions.createProduct({product:product}));
  }

  updateProduct(product:Product){
    this.store.dispatch(ProductPageActions.updateProduct({product:product}));
  }

  clearProduct(){
    this.store.dispatch(ProductPageActions.clearCurrentProduct())
  }
  

}
