import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';

import {verticalScale, windowWidth} from '@constants/Metrics';
import {fetchProducts} from '@state/slices/products/ProductsSlice';
import {IProductsSection, IProduct} from '@state/slices/products/types';
import {AppDispatch} from '@state/store';
import {useDispatch} from 'react-redux';

import {mockProducts} from '@adapters/mockData';
import ProductCard from './ProductCard';
import HomeEmpty from './HomeEmpty';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@navigation/types';

type IProductsSectionListProps = {
  currentProductIndex: number; // The index of the currently selected product section
  products: IProductsSection[]; // The list of product sections to display
  isLoading: boolean; // A flag to indicate if data is loading
  getCurrentProductIndex: (productIndex: number) => void; // A function to update the current product index
};

const ProductsSectionList: React.FC<IProductsSectionListProps> = ({
  currentProductIndex,
  getCurrentProductIndex,
  products,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(currentProductIndex);
  const flatListRef = useRef<FlatList>(null);
  const [refreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();

  // Sync the local state with the currentProductIndex prop when it changes
  useEffect(() => {
    setCurrentIndex(currentProductIndex);
  }, [currentProductIndex]);

  // Scroll to the current product section index when it changes
  useEffect(() => {
    if (flatListRef.current && products.length > 0) {
      flatListRef.current.scrollToIndex({index: currentIndex, animated: false});
    }
  }, [currentIndex, products.length]);

  // Configuration for determining which items are visible in the list
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 60,
  };

  // Callback to handle changes in visible items
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      getCurrentProductIndex(viewableItems[0].index ?? 0); // Update the current product index
    }
  };

  const onPressRetry = () => {
    dispatch(fetchProducts());
  };

  //Handle press events on product cards
  const onPressCard = (item: IProduct) => {
    navigation.navigate('productDetails', {
      product: item,
    });
    // router.push({ pathname: '/productDetails', params: { product: JSON.stringify(item) } });
  };

  // Render a single section of products
  const renderItem = useCallback(
    ({item}: {item: IProductsSection}) => (
      <FlatList
        data={item.data}
        numColumns={2}
        ItemSeparatorComponent={itemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.innerFlatListContent}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.innerFlatList}
        renderItem={renderItemSec}
      />
    ),
    [isLoading],
  );

  // Render individual product cards
  const renderItemSec = useCallback(
    ({item}: {item: IProduct}) => (
      <ProductCard
        cardDetails={item}
        onPressCard={() => onPressCard(item)}
        isLoading={isLoading}
      />
    ),
    [isLoading],
  );

  // Render a separator between items in the product grid
  const itemSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={isLoading ? mockProducts : products}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        ListEmptyComponent={<HomeEmpty retry={onPressRetry} />}
        viewabilityConfig={viewabilityConfig}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={styles.flatListContent}
        pagingEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProductsSectionList;

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: verticalScale(24)},
  flatListContent: {flexGrow: 1},
  innerFlatListContent: {
    paddingHorizontal:
      Platform.OS === 'ios' ? verticalScale(16) : verticalScale(20),
    justifyContent: 'space-between',
  },
  columnWrapper: {justifyContent: 'space-between'},
  innerFlatList: {width: windowWidth},
  separator: {
    height: verticalScale(16),
  },
});
