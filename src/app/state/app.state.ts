import { UserState } from "../user/state/user.reducer";

export interface State{
    user:UserState;
    /*
We are not including the state of lazy loaded modules here because we cannot access the state
of a module which will be loaded at a later time.
    */
}