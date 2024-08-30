import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import LottieView from 'lottie-react-native';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {animations} from '@assets/exporter';

const OrderSuccess = () => {
  const navigation = useNavigation();

  const navigateToNextScreen = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      style={styles.gradient}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      colors={['#B414DC', '#3757EA']}>
      <Text className={'font-bold text-white text-3xl'}>
        Order Placed Successfully
      </Text>
      <LottieView
        autoPlay
        loop={false}
        style={styles.lottie}
        onAnimationFinish={navigateToNextScreen}
        source={animations.confetti}
      />
    </LinearGradient>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
