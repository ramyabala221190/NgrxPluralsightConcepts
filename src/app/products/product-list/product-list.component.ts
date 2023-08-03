import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnDestroy {
  pageTitle = 'Products';
  
  @Input('products')products:Product[]
  @Input('selectedProduct')selectedProduct:Product|null;
  @Input('displayCode')displayCode:boolean;
  @Input('errorMessage')errorMessage:string;

  @Output('productSelected$')productSelected$=new EventEmitter<Product>();
  @Output('newProduct$')newProduct$=new EventEmitter<any>()
  @Output('checkChanged$')checkChanged$=new EventEmitter<any>();

  constructor() { }


  ngOnDestroy(){
  
  }

  productSelected(product:Product){
    this.productSelected$.emit(product)
  }

  newProduct(){
this.newProduct$.emit();
  }

  checkChanged(){
 this.checkChanged$.emit();
  }

 
}
