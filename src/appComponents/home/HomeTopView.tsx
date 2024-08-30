import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {icons, images} from '@assets/exporter';
import GradientView from '@components/organisms/GradientView';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@navigation/types';

type IHomeTopViewProps = {
  userName: string;
};

const HomeTopView: React.FC<IHomeTopViewProps> = ({userName}) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View className="px-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">Hello,{userName}</Text>
        <View className="flex gap-3 flex-row">
          <Image source={icons.search} />
          <TouchableOpacity onPress={() => navigation.navigate('checkout')}>
            <Image
              resizeMode="contain"
              className="w-9 h-9"
              source={images.userPlaceHolder}
            />
          </TouchableOpacity>
        </View>
      </View>
      <GradientView customClass="w-full mt-[9px] h-[7px] rounded-full" />
    </View>
  );
};

export default HomeTopView;

const styles = StyleSheet.create({});
