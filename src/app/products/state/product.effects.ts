import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from './actions/product-page.action'
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductService } from "../product.service";
import { ProductApiActions } from "./actions";

@Injectable()

export class ProductEffects{
    constructor(private actions$:Actions,private productService:ProductService){}

    loadProducts$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductActions.getProducts),
            mergeMap(()=>{
                return this.productService.getProducts().pipe(
                    map((products)=> ProductApiActions.getProductsSuccess({product:products})
                    ),
                    catchError(err=>of(ProductApiActions.getProductsFailure({error:err})))
                )
            })
        )
    })

    updateProduct$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap((action)=>{
                return this.productService.updateProduct(action.product).pipe(
                    map((product)=>ProductApiActions.updateProductSuccess({product:product})),
                    catchError(err=>of(ProductApiActions.updateProductFailure({error:err}))
                )
                )
            })
        )
    })

    createProduct$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductActions.createProduct),
            mergeMap(action=>{
                return this.productService.createProduct(action.product).pipe(
                    map((product)=>ProductApiActions.createProductSuccess({product:product})),
                    catchError(err=>of(ProductApiActions.createProductFailure({error:err})))
                )
            })
        )
    })

    deleteProduct$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(action=>{
                return this.productService.deleteProduct(action.currentProductId).pipe(
                    map((product)=>ProductApiActions.deleteProductSuccess({currentProductId:action.currentProductId})),
                    catchError(err=>of(ProductApiActions.deleteProductFailure({error:err})))
                )
            })
        )
    })
}