import {ICustomizedErrorResponse} from '@adapters/types';

export type IProductsInitialState = {
  categories: ICategory[];
  products: IProductsSection[];
  status: 'loading' | 'success' | 'error';
  error: null | ICustomizedErrorResponse;
};

export interface IProductsSection {
  title: ICategory;
  data: IProduct[];
}
[];
export interface IProduct {
  id: number;
  name: string;
  ingredients: string;
  weight: string;
  price: number;
  banner: string | undefined;
  category?: ICategory | undefined;
}

export type ICategory = {
  id: number;
  name: string;
  banner: string | null | undefined;
};

export interface IGetProductResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      weight: string;
      ingredients: string;
      price: number;
      banner?: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      category?: {
        data:
          | {
              id: number;
              attributes: {
                name: string;
                banner: {
                  data: {
                    attributes: {
                      url: string;
                    };
                  };
                };
              };
            }
          | undefined;
      };
    };
  }[];
}
