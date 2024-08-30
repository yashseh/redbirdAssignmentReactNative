import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import GradientView from '@components/organisms/GradientView';
import {defaultGradient, secondaryGradient} from '@constants/Gradients';
import {getColor} from '@utils/GetColor';

type ICategoryHomeCardProps = {
  categoryName: string;
  categoryBanner: string | undefined | null;
  isLoading: boolean;
  onPressCategory: () => void;
  isSelected: boolean;
};

const CategoryHomeCard: React.FC<ICategoryHomeCardProps> = ({
  categoryName,
  categoryBanner,
  isLoading,
  isSelected,
  onPressCategory,
}) => {
  const colors = useMemo(() => [getColor('darkGrey'), 'transparent'], []);

  return (
    <>
      {isLoading ? (
        <View>
          <View className="w-14 h-14  p-2 rounded-lg bg-skelton" />
          <Text className="h-3 font-medium rounded-xl  mt-2   bg-skelton" />
        </View>
      ) : (
        <View className="justify-start items-center">
          <Pressable onPress={onPressCategory}>
            <GradientView
              colors={isSelected ? defaultGradient : secondaryGradient}
              customClass="w-14 h-14  p-2 rounded-lg items-center">
              {categoryBanner && (
                <Image
                  className="w-9 h-9"
                  resizeMode="contain"
                  source={{uri: categoryBanner}}
                />
              )}
            </GradientView>
          </Pressable>
          <Text className="text-[12px] font-medium  mt-2 text-white">
            {categoryName}
          </Text>
        </View>
      )}
    </>
  );
};

export default memo(CategoryHomeCard);

const styles = StyleSheet.create({});
