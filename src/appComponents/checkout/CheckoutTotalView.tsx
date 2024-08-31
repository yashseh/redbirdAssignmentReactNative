import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import GradientView from '@components/organisms/GradientView';
import {useScreenInsets} from '@hooks/useScreenInsets';
import {deleteCart} from '@state/slices/cart/CartSlice';
import {AppDispatch} from '@state/store';

import {useDispatch} from 'react-redux';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {
  useNavigation,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import {NavigationProps, routNames} from '@navigation/types';

type ICheckoutTotalViewProps = {
  total: number;
};

const CheckoutTotalView: React.FC<ICheckoutTotalViewProps> = ({total}) => {
  const {insetsBottom} = useScreenInsets();
  const styles = createStyles(insetsBottom);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();
  const tax = useMemo(() => Math.round((total * 5) / 100), [total]);
  const amountToPay = useMemo(() => tax + total, [total]);

  const onPressCheckout = () => {
    navigation.navigate('orderSuccess');
    dispatch(deleteCart());
  };

  return (
    <Animated.View
      exiting={FadeOutDown}
      style={[styles.container]}
      className="bg-blackTernary  shadow-sm shadow-yellow-500 rounded-t-lg px-4 pt-4">
      <View className="gap-y-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-regular  text-[16px] text-white">
            Cost of all items
          </Text>
          <Text className="font-regular  text-[16px] text-white">₹{total}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-regular  text-[16px] text-white">Tax</Text>
          <Text className="font-regular  text-[16px] text-white">₹{tax}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-regular  text-[16px] text-white">Total</Text>
          <Text className="font-regular  text-[16px] text-white">
            ₹{amountToPay}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onPressCheckout()}>
        <GradientView customClass="w-[90%] mt-6 self-center  items-center justify-center rounded-xl h-12">
          <Text className="font-bold  text-black text-xl">Place Order</Text>
        </GradientView>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CheckoutTotalView;

const createStyles = (insetBottom: number) => {
  const styles = StyleSheet.create({
    container: {
      paddingBottom: insetBottom,
    },
  });
  return styles;
};
