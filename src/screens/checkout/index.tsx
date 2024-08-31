import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {CheckoutCard, CheckoutTotalView} from '@appComponents/checkout';
import {animations} from '@assets/exporter';
import {useScreenInsets} from '@hooks/useScreenInsets';
import {
  cartProductsFromState,
  cartTotalFromState,
} from '@state/slices/cart/CartSlice';
import {ICartProduct} from '@state/slices/cart/types';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {Header} from '@components/molecules';
import {SafeAreaView} from '@components/organisms';

const Checkout = () => {
  const cartProducts = useSelector(cartProductsFromState);
  const cartTotal = useSelector(cartTotalFromState);
  const {insetsBottom} = useScreenInsets();

  const styles = createStyles(insetsBottom);

  const renderItem = useCallback(
    ({item}: {item: ICartProduct}) => <CheckoutCard product={item} />,
    [],
  );
  const itemSeparator = useCallback(() => <View className="h-4" />, []);

  return (
    <SafeAreaView hideBottomSpace>
      <View className="bg-primary flex-1">
        <View className="px-4 pt-4 flex-1">
          <Header title="Checkout" />
          <View className="flex-1 mt-8">
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content}
              ItemSeparatorComponent={itemSeparator}
              data={cartProducts}
              ListEmptyComponent={
                <View className="h-full w-full  -top-[10%] absolute">
                  <LottieView
                    style={styles.lottie}
                    autoPlay
                    source={animations.emptyCart}
                  />
                </View>
              }
              ListFooterComponent={<View className="h-10" />}
              renderItem={renderItem}
            />
          </View>
        </View>
        {cartTotal > 0 && <CheckoutTotalView total={cartTotal} />}
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const createStyles = (insetBottom: number) => {
  const styles = StyleSheet.create({
    container: {
      paddingBottom: insetBottom,
    },
    content: {
      flexGrow: 1,
    },
    lottie: {
      width: '100%',
      height: '100%',
    },
  });
  return styles;
};
