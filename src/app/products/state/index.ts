import { createFeatureSelector, createSelector } from "@ngrx/store"
import * as AppState from '../../state/app.state';
import { ProductState } from "./product.reducer";

/*
All state definitions and selectors for product feature are defined in the index.ts file
*/

export interface State extends AppState.State{
    products:ProductState
}

const getProductFeatureState=createFeatureSelector<ProductState>('products') // products slice ofstate

//extracting the showProductCode from the product slice of state
export const getShowProductCode=createSelector(
    getProductFeatureState,
    state=>state.showProductCode
)

export const getCurrentProductId=createSelector(
    getProductFeatureState,
    state=>state.currentProductId
)

export const getCurrentProduct=createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state,currentProductId:number)=>{
        if(currentProductId == 0){
            return {
                id: 0,
    productName: "",
    productCode: "New",
    description: "",
    starRating: 0
            }
        }
        else{
            return currentProductId ? state.products.find(x=>x.id == currentProductId) :null
        }
    
    }
)



export const getProducts=createSelector(
    getProductFeatureState,
    state=>state.products
)

export const getErrorMessage=createSelector(
    getProductFeatureState,
    state=>state.error
)