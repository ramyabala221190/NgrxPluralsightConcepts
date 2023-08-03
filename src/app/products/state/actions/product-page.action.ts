import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const toggleProductCodeDisplay=createAction('[ProductPage] Toggle Product Code Display');

export const setCurrentProduct=createAction('[Product Page] Set Current Product',
props<{currentProductId:number}>())

//actions dispatched by component
export const clearCurrentProduct=createAction('[Product Page] Clear Current Product')

export const initialiseCurrentProduct=createAction('[Product Page] Initialise Current Product')

export const getProducts=createAction('[Product Page] Get Products');

export const updateProduct=createAction('[Product Page] Update Product',props<{product:Product}>());

export const createProduct=createAction('[Product Page] Create Product',props<{product:Product}>());

export const deleteProduct=createAction('[Product Page] Delete Product',props<{currentProductId:number}>());