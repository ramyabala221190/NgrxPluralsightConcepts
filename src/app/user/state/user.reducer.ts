import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action';
import { User } from "../user";

export interface UserState{
    togglePasswordMask:boolean,
    currentUser:User
}

const initialState:UserState={
    togglePasswordMask: true,
    currentUser: null
}

export const userReducer=createReducer<UserState>(
    initialState,
    on(UserActions.userPasswordMaskToggle,(state:UserState)=>{
        return {
            ...state,
            togglePasswordMask:!state.togglePasswordMask
        }
    })
)