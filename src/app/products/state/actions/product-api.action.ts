//Only API actions handled by effects

import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

//actions dispatched by effects

export const getProductsSuccess=createAction('[Product API] Products Success',
props<{product:Product[]}>())

export const getProductsFailure=createAction('[Product API] Products Failure',
props<{error:string}>())


export const updateProductSuccess= createAction('[Product API] Update Product Success',
props<{product:Product}>());

export const updateProductFailure=createAction('[Product API] Update Product Failure',props<{error:string}>());

export const createProductSuccess=createAction('[Product API] Create Product Success',props<{product:Product}>());

export const createProductFailure=createAction('[Product API] Create Product Failure',props<{error:string}>())

export const deleteProductSuccess=createAction('[Product API] Delete Product Success',props<{currentProductId:number}>());

export const deleteProductFailure=createAction('[Product API] Delete Product Failure',props<{error:string}>())