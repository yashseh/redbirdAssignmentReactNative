import {
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {verticalScale} from '@constants/Metrics';
import {useScreenInsets} from '@hooks/useScreenInsets';
import {getColor} from '@utils/GetColor';

type ISafeAreaViewProps = {
  children: React.ReactNode;
  paddingHorizontal?: boolean;
  hideTopSpace?: boolean;
  hideBottomSpace?: boolean;
  styles?: StyleProp<ViewStyle>;
};

const SafeAreaView: React.FC<ISafeAreaViewProps> = ({
  children,
  paddingHorizontal,
  hideTopSpace,
  hideBottomSpace,
  styles,
}) => {
  const {insetsTop, insetsBottom} = useScreenInsets();
  return (
    <View
      style={[
        style.container,
        {
          paddingTop: hideTopSpace ? 0 : insetsTop,
          paddingBottom: hideBottomSpace ? 0 : insetsBottom,
        },
        paddingHorizontal && {paddingHorizontal: verticalScale(16)},
        styles,
      ]}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {children}
    </View>
  );
};

export default SafeAreaView;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor('primary'),
  },
});
