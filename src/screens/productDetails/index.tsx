import CartPopover from '@appComponents/home/CartPopover';
import {getProductCount} from '@appComponents/home/ProductCard';
import {images, icons} from '@assets/exporter';
import {Header} from '@components/molecules';
import {verticalScale} from '@constants/Metrics';
import {useScreenInsets} from '@hooks/useScreenInsets';
import {BlurView} from '@react-native-community/blur';
import {
  cartProductsFromState,
  addProductToCart,
  removeProductFromCart,
} from '@state/slices/cart/CartSlice';
import {IProduct} from '@state/slices/products/types';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';

type IProductDetailsProps = {
  route: {
    params: {
      product: IProduct;
    };
  };
};

const ProductDetails: React.FC<IProductDetailsProps> = ({route}) => {
  const product = route.params.product;

  const {insetsTop, insetsBottom} = useScreenInsets();
  const [productDetails, setProductDetails] = useState<IProduct | null>(null);
  const cartProducts = useSelector(cartProductsFromState);
  const dispatch = useDispatch();

  const getInitialQuantity = getProductCount(cartProducts, product);
  const [productCount, setProductCount] = useState(getInitialQuantity);

  const addProduct = () => {
    setProductCount(prevCount => prevCount + 1);
    dispatch(
      addProductToCart({
        ...product,
        quantity: productCount + 1,
      }),
    );
  };

  const removeProduct = () => {
    if (productCount > 0) {
      setProductCount(prevCount => prevCount - 1);
      dispatch(
        removeProductFromCart({
          ...product,
          quantity: productCount - 1,
        }),
      );
    }
  };

  useEffect(() => {
    setProductCount(getInitialQuantity);
  }, [cartProducts]);

  useEffect(() => {
    if (product) {
      setProductDetails(product);
    }
  }, [product]);

  return (
    <View
      className="bg-black"
      style={[
        styles.container,
        {paddingTop: insetsTop, paddingBottom: insetsBottom},
      ]}>
      <CartPopover>
        <View style={styles.mainView}>
          <Header title={productDetails?.name ?? ''} />
          {productDetails?.banner && (
            <Animated.Image
              sharedTransitionTag={`${productDetails.id}${productDetails.name}`}
              style={styles.banner}
              resizeMode={'contain'}
              defaultSource={images.placeholderImage}
              source={{uri: productDetails.banner, cache: 'force-cache'}}
            />
          )}
          <Animated.View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-white  text-2xl font-bold">
                {productDetails?.name}
              </Text>
            </View>
            <Text className="text-darkGrey mt-4 text-lg font-bold">
              {productDetails?.ingredients}
            </Text>

            <View className="flex  mt-4 justify-between  items-end flex-row">
              <View
                style={styles.weightContainer}
                className="py-1 flex shadow-sm shadow-gradientLight items-center flex-row px-3 rounded-full  bg-blackSecondary">
                <Image className="w-6 h-6" source={icons.weight} />
                <View className="ml-4">
                  <Text className=" font-medium  text-md text-white">300g</Text>
                  <Text className=" font-medium text-xs text-darkGrey ">
                    weight
                  </Text>
                </View>
              </View>
              <View
                style={styles.weightContainer}
                className="py-1 flex shadow-sm shadow-gradientLight items-center flex-row px-3 rounded-full  bg-blackSecondary">
                <Image className="w-6 h-6" source={icons.calories} />
                <View className="ml-4">
                  <Text className=" font-medium  text-md text-white">300</Text>
                  <Text className=" font-medium text-xs text-darkGrey ">
                    Calories
                  </Text>
                </View>
              </View>
              <View className="flex  bg-black  shadow-sm shadow-gradientLight w-[100px] py-1 justify-center rounded-full flex-row items-center gap-x-2">
                <Image className="w-6 h-6" source={icons.rating} />
                <Text className="text-white font-bold text-2xl">3.2</Text>
              </View>
            </View>
            <View>
              <Text className="text-white mt-4 text-2xl font-bold">
                ₹{productDetails?.price}
              </Text>
            </View>
            <View className="mt-4">
              {!productCount ? (
                <Pressable onPress={addProduct}>
                  <View
                    style={styles.buttonView}
                    className=" flex-row items-center shadow-sm shadow-red  bg-black rounded-full px-2 justify-center">
                    <Text className="font-bold text-white text-xl">Add</Text>
                  </View>
                </Pressable>
              ) : (
                <View
                  style={styles.buttonView}
                  className=" flex-row shadow-sm shadow-red  items-center bg-black rounded-full px-2 justify-between">
                  <Pressable
                    hitSlop={{right: 10, left: 10, top: 10, bottom: 10}}
                    className="bg-red  justify-center items-center w-7 h-7 rounded-full"
                    onPress={removeProduct}>
                    <Image className="w-[18px] h-[4]" source={icons.minus} />
                  </Pressable>
                  <Text className="font-bold text-white text-3xl">
                    {productCount}
                  </Text>
                  <Pressable
                    className="bg-green justify-center items-center  w-7 h-7 rounded-full"
                    hitSlop={{right: 10, left: 10}}
                    onPress={addProduct}>
                    <Image source={icons.plus} />
                  </Pressable>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </CartPopover>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  banner: {
    width: 240,
    height: 200,
    alignSelf: 'center',
    marginTop: 22,
  },
  text: {
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  mainView: {
    paddingHorizontal: 16,
    flex: 1,
  },
  button: {
    width: verticalScale(36),
    height: verticalScale(36),
  },
  weightContainer: {
    // height: verticalScale(40)
  },
  buttonView: {
    width: verticalScale(120),
    height: verticalScale(46),
  },
});
