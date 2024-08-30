import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {defaultGradient} from '@constants/Gradients';

type IGradientViewProps = {
  colors?: string[];
  customClass?: string;
  customStyles?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const GradientView: React.FC<IGradientViewProps> = ({
  colors,
  children,
  customStyles,
  customClass,
}) => {
  return (
    <LinearGradient
      style={customStyles}
      colors={colors ?? defaultGradient}
      className={customClass}>
      {children}
    </LinearGradient>
  );
};

export default memo(GradientView);
