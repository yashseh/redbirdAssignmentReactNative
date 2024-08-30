import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  ICategory,
  IGetProductResponse,
  IProductsInitialState,
  IProductsSection,
} from './types';
import {RootState} from '@state/store';
import {endpoints} from '@adapters/endpoints';
import {getApiCall} from '@adapters/apiManager';
import {ICustomizedErrorResponse} from '@adapters/types';

//ProductSlice initialState
const initialState: IProductsInitialState = {
  categories: [],
  products: [],
  status: 'loading',
  error: null,
};

// fetch products and categories
export const fetchProducts = createAsyncThunk<
  {data: IGetProductResponse['data']; error: ICustomizedErrorResponse | null},
  void
>('products/fetchProducts', async () => {
  try {
    const response: IGetProductResponse = await getApiCall({
      url: endpoints.products,
    });

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const customizedError = error as ICustomizedErrorResponse;

    return {
      data: [],
      error: customizedError,
    };
  }
});

//product slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        const categoriesMap = new Map<number, ICategory>();
        let products: IProductsSection[] = [];

        action.payload.data?.forEach(product => {
          const categoryId = product.attributes.category?.data?.id ?? -1;
          const categoryName =
            product.attributes.category?.data?.attributes?.name;
          const categoryBanner =
            product.attributes.category?.data?.attributes?.banner?.data
              ?.attributes?.url;

          const isExiting = categoriesMap.has(categoryId);
          if (!isExiting && categoryName) {
            categoriesMap.set(categoryId, {
              id: categoryId,
              name: categoryName,
              banner: categoryBanner,
            });
          }
          // ensures category is there
          if (categoryId && categoryName) {
            const productAttributes = {
              id: product.id,
              name: product.attributes.name,
              weight: product.attributes.weight,
              price: product.attributes.price,
              ingredients: product.attributes.ingredients,
              banner: product.attributes.banner?.data?.attributes?.url,
              category: {
                id: categoryId,
                name: categoryName,
                banner: categoryBanner,
              },
            };

            // Check if the category already exists in the products array
            let existingCategory = products.find(
              p => p.title.id === categoryId,
            );

            if (existingCategory) {
              // Add product to the existing category
              existingCategory.data.push(productAttributes);
            } else {
              // Create a new category section
              let newCategory: IProductsSection = {
                title: {
                  id: categoryId,
                  name: categoryName,
                  banner: categoryBanner,
                },
                data: [productAttributes],
              };
              products.push(newCategory);
            }
          }
        });

        state.categories = Array.from(categoriesMap.values());
        state.products = products;
        state.error = action.payload.error;
      });
  },
});

export default productsSlice.reducer;

// state extractors
export const categoriesFromState = (state: RootState) =>
  state.products.categories;
export const productsFromState = (state: RootState) => state.products.products;
export const productsFetchingState = (state: RootState) =>
  state.products.status;
export const productsErrorState = (state: RootState) => state.products.error;
