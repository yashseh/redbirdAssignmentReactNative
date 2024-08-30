import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ICartInitialState, ICartProduct} from './types';
import {RootState} from '@state/store';

//cartSlice initialState
const initialState: ICartInitialState = {
  cartProducts: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //add product to cart and update quantity if product is already in cart
    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const {price, id} = action.payload;
      const existingProductIndex = state.cartProducts.findIndex(
        product => product.id === id,
      );
      const newCartProducts = [...state.cartProducts];
      let newCartTotal = state.cartTotal;
      if (existingProductIndex !== -1) {
        newCartProducts[existingProductIndex] = action.payload;
      } else {
        newCartProducts.push(action.payload);
      }
      if (price) {
        newCartTotal += price;
      }
      state.cartProducts = newCartProducts;
      state.cartTotal = newCartTotal;
    },
    // delete  cart
    deleteCart: state => {
      state.cartProducts = [];
      state.cartTotal = 0;
    },
    //remove product from cart and decreases quantity if product is already in cart
    removeProductFromCart: (state, action: PayloadAction<ICartProduct>) => {
      const {price, id} = action.payload;
      const existingProductIndex = state.cartProducts.findIndex(
        product => product.id === id,
      );
      const cartProducts = [...state.cartProducts];
      let newCartTotal = state.cartTotal;

      if (existingProductIndex !== -1) {
        if (action.payload.quantity === 0) {
          cartProducts.splice(existingProductIndex, 1);
        } else {
          cartProducts[existingProductIndex] = action.payload;
        }
      }
      if (price) {
        newCartTotal -= price;
      }
      state.cartProducts = cartProducts;
      state.cartTotal = newCartTotal;
    },
  },
});

//reducer exporter
export default cartSlice.reducer;

//actions
export const {addProductToCart, deleteCart, removeProductFromCart} =
  cartSlice.actions;

//state extractors
export const cartProductsFromState = (state: RootState) =>
  state.cart.cartProducts;
export const cartTotalFromState = (state: RootState) => state.cart.cartTotal;
