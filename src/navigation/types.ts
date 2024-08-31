import {NavigationProp} from '@react-navigation/native';
import {IProduct} from '../state/slices/products/types';

//type of params which are required by the screen;
export type RootStackParamList = {
  splash: undefined;
  checkout: undefined;
  home: undefined;
  orderSuccess: undefined;
  productDetails: {
    product: IProduct;
  };
};

export type NavigationProps = NavigationProp<RootStackParamList>;

//routes type definitions
type IScreenType = {
  splash: 'splash';
  home: 'home';
  checkout: 'checkout';
  orderSuccess: 'orderSuccess';
  productDetails: 'productDetails';
};

//routes name definitions
export const routNames: IScreenType = {
  splash: 'splash',
  checkout: 'checkout',
  home: 'home',
  orderSuccess: 'orderSuccess',
  productDetails: 'productDetails',
};
