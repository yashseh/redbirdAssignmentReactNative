import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import GradientView from '../organisms/GradientView';
import {icons} from '@assets/exporter';
import {useNavigation} from '@react-navigation/native';

type IHeaderProps = {
  title: string;
};

const Header: React.FC<IHeaderProps> = ({title}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View className=" flex-row items-center justify-center w-full">
      <TouchableOpacity className="absolute left-0" onPress={onPressBack}>
        <GradientView customClass="w-11 h-11 justify-center items-center rounded-lg">
          <Image className="w-[18px] h-[15px]" source={icons.back} />
        </GradientView>
      </TouchableOpacity>
      <Text className="text-white text-center text-xl font-bold">{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
