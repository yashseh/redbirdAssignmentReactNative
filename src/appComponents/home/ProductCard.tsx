import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';

import {useSelector, useDispatch} from 'react-redux';
import {images, icons} from '@assets/exporter';
import GradientView from '@components/organisms/GradientView';
import {verticalScale, moderateScale} from '@constants/Metrics';
import {
  cartProductsFromState,
  addProductToCart,
  removeProductFromCart,
} from '@state/slices/cart/CartSlice';
import {ICartProduct} from '@state/slices/cart/types';
import {IProduct} from '@state/slices/products/types';
import {getColor} from '@utils/GetColor';

type IProductCardProps = {
  cardDetails: IProduct;
  isLoading: boolean;
  onPressCard: () => void;
};

const ProductCard: React.FC<IProductCardProps> = ({
  cardDetails,
  onPressCard,
  isLoading,
}) => {
  // Get the list of products currently in the cart from the Redux store
  const cartProducts = useSelector(cartProductsFromState);
  const dispatch = useDispatch();

  // Get the initial quantity of the product in the cart
  const getInitialQuantity = getProductCount(cartProducts, cardDetails);
  const [productCount, setProductCount] = useState(getInitialQuantity);

  // Update the product count whenever the cart changes
  useEffect(() => {
    setProductCount(getInitialQuantity);
  }, [cartProducts]);

  // Function to add a product to the cart
  const addProduct = () => {
    setProductCount(prevCount => prevCount + 1);
    dispatch(addProductToCart({...cardDetails, quantity: productCount + 1}));
  };

  // Function to remove a product from the cart
  const removeProduct = () => {
    if (productCount > 0) {
      setProductCount(prevCount => prevCount - 1);
      dispatch(
        removeProductFromCart({...cardDetails, quantity: productCount - 1}),
      );
    }
  };

  return (
    <Pressable onPress={onPressCard} style={styles.container}>
      <>
        {isLoading ? (
          // Display skeleton loaders while the data is being loaded
          <>
            <View className="bg-skelton rounded-lg" style={styles.burger} />
            <View className="bg-skelton mt-4 self-center w-[90%] h-4 rounded-lg" />
            <View className="bg-skelton mt-2 self-center w-[90%] h-4 rounded-lg" />
            <View className="mt-4">
              <View
                className="bg-skelton rounded-full h-7 w-full px-2"
                children
              />
            </View>
          </>
        ) : (
          // Display the product details when the data is loaded
          <>
            {cardDetails?.banner && (
              <Animated.Image
                sharedTransitionTag={`${cardDetails.id}${cardDetails.name}`}
                style={styles.burger}
                resizeMode={'contain'}
                defaultSource={images.placeholderImage}
                source={{uri: cardDetails.banner, cache: 'force-cache'}}
              />
            )}
            <Text
              className="font-medium text-white"
              numberOfLines={1}
              style={styles.title}>
              {cardDetails.name}
            </Text>
            <Text
              style={styles.subTitle}
              numberOfLines={3}
              ellipsizeMode="tail"
              className="text-darkGrey">
              {cardDetails.ingredients}
            </Text>
            <View className="w-full mt-2 flex-1 justify-end">
              <View className="flex flex-row justify-between items-end">
                <Text className="text-white font-bold" style={styles.price}>
                  ₹{cardDetails.price}
                </Text>
                <View className="flex gap-3 items-end flex-row">
                  {!productCount ? (
                    // Show 'Add' button if the product is not in the cart
                    <Pressable onPress={addProduct}>
                      <GradientView
                        customClass="rounded-full px-2"
                        customStyles={styles.button}>
                        <View className="flex-row flex-1 items-center justify-center">
                          <Text
                            className="font-bold text-black"
                            style={styles.addText}>
                            Add
                          </Text>
                        </View>
                      </GradientView>
                    </Pressable>
                  ) : (
                    // Show increment and decrement buttons if the product is in the cart
                    <Pressable>
                      <View
                        style={styles.button}
                        className=" flex-row items-center bg-black rounded-full px-2 justify-between">
                        <Pressable
                          hitSlop={{right: 10, left: 10, top: 10, bottom: 10}}
                          className="bg-red justify-center items-center w-5 h-5 rounded-full"
                          onPress={removeProduct}>
                          <Image
                            className="w-[14px] h-[2]"
                            source={icons.minus}
                          />
                        </Pressable>
                        <Text
                          className="font-bold text-white text-3xl"
                          style={styles.addTextTwo}>
                          {productCount}
                        </Text>
                        <Pressable
                          className="bg-green justify-center items-center w-5 h-5 rounded-full"
                          hitSlop={{right: 10, left: 10}}
                          onPress={addProduct}>
                          <Image source={icons.plus} />
                        </Pressable>
                      </View>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          </>
        )}
      </>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: verticalScale(172),
    padding: verticalScale(12),
    height: verticalScale(230),
    backgroundColor: getColor('ternary'),
    borderRadius: 20,
  },
  burger: {
    width: verticalScale(139),
    height: verticalScale(92),
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(18),
  },
  subTitle: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(11),
  },
  price: {
    fontSize: moderateScale(18),
  },
  weight: {
    fontSize: moderateScale(9),
  },
  button: {
    width: verticalScale(90),
    height: verticalScale(35),
  },
  weightContainer: {
    height: verticalScale(20),
  },
  addText: {
    fontSize: moderateScale(14),
  },
  addTextTwo: {
    fontSize: moderateScale(16),
  },
});

// Utility function to get the initial quantity of a product in the cart
export const getProductCount = (
  cartProducts: ICartProduct[],
  localProduct: IProduct,
) => {
  const product = cartProducts.find(product => product.id === localProduct.id);
  return product ? product.quantity : 0;
};
