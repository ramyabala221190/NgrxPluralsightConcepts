
State is view state, user info ,entity data,user selection and input

Purpose of ngrx: Provides a formal pattern for organising state into 1 single local state container called the store.
Managing that state by requiring a 1 way data flow and Communicating the state changes to our components
so that they can react accordingly.

Without ngrx, we will use a service to define a state everywhere

ngrx=redux pattern+ angular

Use ngrx when there is state everywhere.
The store provides a place for UI state to retain it between
router views.The store provides a client-side cache to use as needed
when there are excessive http requests 
Use ngrx when there are complex component interactions.

Dont use ngrx when:
=>Team is new to angular
=>Extra code required for Ngrx may not be worth the effort
https://github.com/DeborahK/Angular-NgRx-GettingStarted

------------------------------------------------------------------------------------------------------------------------------
Redux is a state container for Js apps.Redux pattern helps to manage state by providing a 1 way data flow

Redux Principles:

1. Single Source of truth is called the store.
2. State is read only and the only way to change
the state is by dispatching an action.
3. Changes to the store are made using pure functions
called reducers

Store is the JS object that holds all your application state.

Do you put every pieice of state in the store? No
What should not go in the store?
=>Unshared state 
=>Angular form state
=>Non serilizable state

1. Dispatch an action to change state
eg: Login action after login form submission
Toggle side menu action after a button click
Retreive data action when initializing a component
Start global spinner action when saving data

2. Use Reducers to change state.The reducer updates the store and the store notifies all
subscribers
 Set a userDetails property on login
Toggle a sideMenuVisible property to true on button clicl
set successfully retreived data on component initialisatino
set a globalSpinnerVisible property to true while saving
data

Reducers are pure functions. They return the same result for the same
inputs each time. They are not dependent on external variables.

3. Use selectors so that the component can subscribe to the latest state.
-----------------------------------------------------------------------------------------------------------------------
Layout the state by feature modules to prevent confusion with the
state.
State is a Js object which contains properties and each property
is related to a feature module so that it is easy to identify
which part of the state you wantto select.

ng add @ngrx/store will install and add it to the AppModule

import { StoreModule } from '@ngrx/store';

The store is initialised as below in the imports section:
    StoreModule.forRoot(reducer)

The store must intialised to the reducer that creates the application state.
There can be multiple reducers to cater to every feature.

reducer is the AppModule reducer.

We also define a reducer for every feature and initialise the store in each feature module as:
StoreModule.forFeature('name of state',reducer_name)

Reducer modifies the slice of state and replaces the existing state slice with the modified one
making it immutable. So we replace the state instead of modifying the existing state.
 
Selector must be a pure function.Always define a selector for every bit of state and then compose them
as needed to get the desired data

Effects take an action,do some work and dispatch a new action.

ng add @ngrx/effects
add ensures the package is installed and the necessary files are also updated like app.module
and package.json

Effects will call the service code to perform the CRUD operations.Componnets wont do this.

-----------------------------------------------------------------------------------------------

What are the things I define in the .reducer.ts file ?

1. I will create 1 reducer per feature module and 1 reduer per .ts file.
2. The reducer will be registered in the imports section of the feature module.
StoreModule.forFeature('products',productReducer), // products refers to products slice of state
3. I will create a reducer named productReducer using the createReducer() in the .reducer.ts file.
4. A reducer must know the initial state of the feature module's slice of the store i.e the "products" slice of the store.
Hence inside the creatReducer(), we pass the initial state of the "products" slice as the 1st argument
and in the 2nd argument, we listen for non-http actions dispatched from the components  using the on().

In the on(), we pass the name of the action as 1st argument and in the 2nd argument, we have a callback
function that could take multiple arguments.
The first argument is always the at-present state of the slice in the store. The remaining arguments will
correspond to the arguments passed  while dispatching the action from the component.
eg: this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}))

Hence state corresponds to the "at-present" state of the slice and action corresponds to the object
we have passed to ProductActions.setCurrentProduct()
   on(ProductActions.setCurrentProduct,(state,action):ProductState=>{
        console.log(action)
        return {
            ...state,
            currentProductId:action.currentProductId
        }
    }),

This callback function will return the updated value of the slice in the store.

5. How will the component access the updated slice state to display in the view ? For that we define
selectors.

We first create a feature selector to extract the slice of state corresponding to the feature i.e "products".
This we do it using createFeatureSelector()
const getProductFeatureState=createFeatureSelector<ProductState>('products') // products slice ofstate

Next we extract data under "products" by creating selectors using createSelector(). We pass the feature
selector and many more selectors as argument which are required to get the data.
The final argument is a callback function which takes the states returned by each of the selectors passed
in the initial arguments.

6.Component subscribed to the slice of state updates the view. getProducts is the selector.
    this.products$=this.store.select(getProducts);

--------------------------------------------------------------------------------------------------
1. Components dispatches an action(related to CRUD). For CRUD actions, the effect will call the service instead of the component to perform the CRUD. The component will only dispatch the action.

We define all effects related to the feature module in the .effects.ts file.

action argument in the mergeMap is the argument passed to the Action while dispatching it.

 updateProduct$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap((action)=>{
                return this.productService.updateProduct(action.product).pipe(
                    map((product)=>ProductActions.updateProductSuccess({product:product})),
                    catchError(err=>of(ProductActions.updateProductFailure({error:err}))
                )
                )
            })
        )
    })


We are creating an effect which listens for ProductActions.updateProduct action using the ofType operator
and then call the service to perform the action.
Finally it dispatches a ProductActions.updateProductSuccess if action is successfull and 
ProductActions.updateProductFailure in case of failure.
These 2 actions dispatched by the effect will be listened to by reducer to update the state.

3. Reducer listens to this success/error action and updates the state.
4. Component subscribed to the success and error slice of state updates the view

Always use immutable methods while updating state.

Presentation components can use OnPush change detection strategy

Understanding more of barrel files and state modules.
