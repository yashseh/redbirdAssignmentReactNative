import React from 'react';
import {RootStackParamList, routNames} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '@screens/splash';
import Home from '@screens/home';
import Checkout from '@screens/checkout';
import {Platform} from 'react-native';
import OrderSuccess from '@screens/orderSucess';
import ProductDetails from '@screens/productDetails';
import {IProduct} from '@state/slices/products/types';

const Navigator = () => {
  //navigation Stack
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routNames.splash}>
      <Stack.Screen name={routNames.splash} component={Splash} />
      <Stack.Screen name={routNames.home} component={Home} />
      <Stack.Screen name={routNames.orderSuccess} component={OrderSuccess} />
      <Stack.Screen
        options={{
          presentation: Platform.OS === 'ios' ? 'transparentModal' : 'card',
          animation: Platform.OS === 'android' ? 'simple_push' : 'fade',
        }}
        name={routNames.productDetails}>
        {props => <ProductDetails {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{animation: 'slide_from_bottom'}}
        name={routNames.checkout}
        component={Checkout}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
