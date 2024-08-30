import React from 'react';
import {RootStackParamList, routNames} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '@screens/splash';
import Home from '@screens/home';
import Checkout from '@screens/checkout';
import {Platform} from 'react-native';
import OrderSuccess from '@screens/orderSucess';

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
        options={{animation: 'slide_from_bottom'}}
        name={routNames.checkout}
        component={Checkout}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
