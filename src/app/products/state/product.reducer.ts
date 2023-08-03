import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import {ProductPageActions,ProductApiActions} from './actions';

export interface ProductState{
    showProductCode:boolean,
    products:Product[],
    currentProductId:number | null,
    error:string
}

const initialState:ProductState={
    showProductCode: true,
    products: [],
    currentProductId: null,
    error:""
}


export const productReducer=
    createReducer<ProductState>(
    initialState,
    on(
        ProductPageActions.toggleProductCodeDisplay,(state:ProductState)=>{
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageActions.setCurrentProduct,(state,action):ProductState=>{
        console.log(action)
        return {
            ...state,
            currentProductId:action.currentProductId
        }
    }),
    on(ProductPageActions.clearCurrentProduct,(state):ProductState=>{
        return {
            ...state,
            currentProductId:null
        }
    }),
    on(ProductPageActions.initialiseCurrentProduct,(state):ProductState=>{
        return {
            ...state,
           currentProductId:0
        }
    }),
    on(ProductApiActions.getProductsSuccess,(state,action):ProductState=>{
        return {
            ...state,
            products:action.product,
            error:""
        }
    }),
    on(ProductApiActions.getProductsFailure,(state,action):ProductState=>{
        return {
            ...state,
            products:[],
            error:action.error
        }
    }),
    on(ProductApiActions.updateProductSuccess,(state,action):ProductState=>{
        let updatedProducts= state.products.map(x=>x.id === action.product.id ? action.product:x)
        //immutable method
        return {
            ...state,
            products:updatedProducts,
            currentProductId:action.product.id, //setting the current product
            error:""
        }
    }),
    on(ProductApiActions.updateProductFailure,(state,action):ProductState=>{
        return {
            ...state,
            products:state.products,
            error:action.error
        }
    }),
    on(ProductApiActions.createProductSuccess,(state,action):ProductState=>{
        return {
            ...state,
            products:state.products.concat(action.product), //immutable method
            currentProductId:action.product.id,
            error:""

        }
    }),
    on(ProductApiActions.createProductFailure,(state,action):ProductState=>{
        return {
            ...state,
            products:state.products,
            error:action.error

        }
    }),
    on(ProductApiActions.deleteProductSuccess,(state,action):ProductState=>{
        let updatedList=state.products.filter(x=>x.id != action.currentProductId); //immutable method does not impact state.products
        return {
            ...state,
            products:updatedList,
            currentProductId:null, //setting the current product
            error:""
        }
    }),
    on(ProductApiActions.deleteProductFailure,(state,action):ProductState=>{
        return {
            ...state,
            products:state.products,
            error:action.error
        }
    }),
    
    )
