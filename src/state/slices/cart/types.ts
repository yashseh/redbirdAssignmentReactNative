import { IProduct } from '../products/types';

export interface ICartProduct extends IProduct {
    quantity: number;
}

export interface ICartInitialState {
    cartProducts: ICartProduct[];
    cartTotal: number;
}
