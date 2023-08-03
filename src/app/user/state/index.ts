import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";


const userFeatureState=createFeatureSelector<UserState>('user');

export const getTogglePasswordMask=createSelector(
    userFeatureState,
    state=>state.togglePasswordMask
)

export const getCurrentUser=createSelector(
    userFeatureState,
    state=>state.currentUser
)
