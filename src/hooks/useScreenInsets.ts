import {verticalScale, horizontalScale} from '@constants/Metrics';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useScreenInsets = () => {
  const insets = useSafeAreaInsets();

  const insetsBottom = insets.bottom + verticalScale(24);

  const insetsTop = insets.top + verticalScale(8);

  const insetsHorizontal = horizontalScale(16);

  const bottomTabsInsets = Math.max(insets.bottom) + verticalScale(80);

  return {insetsBottom, insetsTop, insetsHorizontal, bottomTabsInsets};
};
