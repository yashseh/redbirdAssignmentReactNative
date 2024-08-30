import { Reducer, combineReducers } from 'redux';
import ProductsSlice from './slices/products/ProductsSlice';
import CartSlice from './slices/cart/CartSlice';
import { IProductsInitialState } from './slices/products/types';
import { ICartInitialState } from './slices/cart/types';

//reducer combine
const combineReducer = combineReducers({
    products: ProductsSlice,
    cart: CartSlice
});

//state type definitions
export interface IState {
    products: Reducer<IProductsInitialState>;
    cart: Reducer<ICartInitialState>;
}

// reducer with  dehydrating  state capabilities
const rootReducer = (state: any, action: { type: string }) => {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return combineReducer(state, action);
};
export default rootReducer;
