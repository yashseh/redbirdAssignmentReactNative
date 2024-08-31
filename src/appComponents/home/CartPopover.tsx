import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {icons} from '@assets/exporter';
import GradientView from '@components/organisms/GradientView';
import {
  cartProductsFromState,
  cartTotalFromState,
  deleteCart,
} from '@state/slices/cart/CartSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@navigation/types';
import {productsFromState} from '@state/slices/products/ProductsSlice';

type ICartPopoverProps = {
  children: React.ReactNode;
  styles?: string;
};

const CartPopover: React.FC<ICartPopoverProps> = ({children, styles}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const products = useSelector(productsFromState);
  const cartProducts = useSelector(cartProductsFromState);
  const cartTotal = useSelector(cartTotalFromState);

  const removeCartHandler = () => {
    dispatch(deleteCart());
  };

  const navigateToCheckout = () => {
    navigation.navigate('checkout');
  };
  return (
    <View className="flex-1">
      {children}
      {cartProducts.length > 0 && products.length > 0 && (
        <Animated.View
          // entering={FadeInDown}
          // exiting={FadeOutDown}
          className={` h-[60px]  px-4 shadow shadow-gradientLight self-center flex-row  items-center justify-between rounded-2xl bottom-0 absolute w-[92%]  bg-[#000000]`}>
          <View className="flex items-center flex-row">
            <Text className="text-white font-medium text-lg">
              {cartProducts.length} items
            </Text>
            <View className="mx-2 w-[1px] h-[80%] bg-darkGrey" />
            <View className="column">
              <View>
                <Text className="text-darkGrey font-medium text-sm">
                  Total:
                </Text>
                <Text className="text-white font-bold text-lg">
                  ₹{cartTotal}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={navigateToCheckout}>
              <GradientView customClass="h-8 align-center rounded-lg justify-center px-2">
                <Text className="font-bold">View Cart</Text>
              </GradientView>
            </TouchableOpacity>

            <TouchableOpacity onPress={removeCartHandler}>
              <Image className="w-5 h-5" source={icons.bin} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default CartPopover;

const styles = StyleSheet.create({});
