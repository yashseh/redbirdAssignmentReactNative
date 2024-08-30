import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {getProductCount} from '@appComponents/home/ProductCard';
import {images, icons} from '@assets/exporter';
import {verticalScale, moderateScale} from '@constants/Metrics';
import {
  cartProductsFromState,
  addProductToCart,
  removeProductFromCart,
} from '@state/slices/cart/CartSlice';
import {IProduct} from '@state/slices/products/types';
import {useSelector, useDispatch} from 'react-redux';

type ICheckoutCardProps = {
  product: IProduct;
};

const CheckoutCard: React.FC<ICheckoutCardProps> = ({product}) => {
  const cartProducts = useSelector(cartProductsFromState);
  const dispatch = useDispatch();
  const getInitialQuantity = getProductCount(cartProducts, product);
  const [productCount, setProductCount] = useState(getInitialQuantity);
  const productPrice = useMemo(
    () => product.price * productCount,
    [productCount],
  );

  useEffect(() => {
    setProductCount(getInitialQuantity);
  }, [cartProducts]);

  const addProduct = () => {
    setProductCount((prevCount: number) => prevCount + 1);
    dispatch(addProductToCart({...product, quantity: productCount + 1}));
  };

  const removeProduct = () => {
    if (productCount > 0) {
      setProductCount((prevCount: number) => prevCount - 1);
      dispatch(removeProductFromCart({...product, quantity: productCount - 1}));
    }
  };

  return (
    <View className="p-3 flex flex-row justify-between items-center bg-ternary rounded-[10px]">
      <View className="flex items-center flex-row">
        {product.banner && (
          <Image
            defaultSource={images.placeholderImage}
            resizeMode="contain"
            source={{uri: product.banner}}
            style={styles.banner}
          />
        )}
        <Image resizeMode="contain" source={{uri: product.banner}} />
        <View className="ml-1">
          <Text className="text-white font-medium" style={styles.title}>
            {product.name}
          </Text>
          <Text className="text-white mt-3  font-bold" style={styles.subTitle}>
            ₹{productPrice}
          </Text>
        </View>
      </View>
      <View>
        <Pressable>
          <View
            style={styles.button}
            className=" flex-row items-center bg-black rounded-full px-2 justify-between">
            <Pressable
              hitSlop={{right: 10, left: 10, top: 10, bottom: 10}}
              className="bg-red justify-center items-center w-5 h-5 rounded-full"
              onPress={removeProduct}>
              <Image className="w-[14px] h-[2]" source={icons.minus} />
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
      </View>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  banner: {
    width: verticalScale(88),
    height: verticalScale(68),
  },
  title: {
    fontSize: moderateScale(16),
    maxWidth: verticalScale(150),
  },
  subTitle: {
    fontSize: moderateScale(16),
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
