import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {images} from '@assets/exporter';
import {verticalScale} from '@constants/Metrics';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@navigation/types';

const Splash = () => {
  const animationValue = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();

  const navigateToNextScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'home'}],
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animationValue.value,
      transform: [{scale: animationValue.value}],
    };
  });

  useEffect(() => {
    animationValue.value = withTiming(
      1,
      {
        duration: 1000,
      },
      finished => {
        if (finished) {
          runOnJS(navigateToNextScreen)();
        }
      },
    );
  }, []);

  return (
    <View className="flex-1 bg-black  justify-center items-center">
      <Animated.Image
        style={[styles.logo, animatedStyle]}
        className="w-80"
        resizeMode="contain"
        source={images.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    marginTop: -verticalScale(60),
  },
});
