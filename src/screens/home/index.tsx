import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CartPopover from '@appComponents/home/CartPopover';
import {
  HomeTopView,
  HomeCategoriesView,
  ProductList,
} from '@appComponents/home';
import {verticalScale} from '@constants/Metrics';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@state/store';
import {
  categoriesFromState,
  fetchProducts,
  productsFetchingState,
  productsFromState,
} from '@state/slices/products/ProductsSlice';
import {SafeAreaView} from '@components/organisms';

console.log(process.env.BASE_URL);

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(productsFetchingState) === 'loading';
  const categories = useSelector(categoriesFromState);
  const products = useSelector(productsFromState);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedProductPageIndex, setCurrentSelectedProductIndex] =
    useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <SafeAreaView>
      <CartPopover>
        <View style={styles.container}>
          <HomeTopView userName="Tanmay" />
          <View style={styles.categoriesView}>
            <HomeCategoriesView
              categories={categories}
              isLoading={isLoading}
              selectedCategoryIndex={selectedProductPageIndex}
              getSelectedCategoryIndex={setSelectedCategoryIndex}
            />
          </View>
          <ProductList
            currentProductIndex={selectedCategoryIndex}
            getCurrentProductIndex={setCurrentSelectedProductIndex}
            products={products}
            isLoading={isLoading}
          />
        </View>
      </CartPopover>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  categoriesView: {
    marginVertical: verticalScale(16),
    marginLeft: verticalScale(16),
  },
});
