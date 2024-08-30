import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GradientView from '@components/organisms/GradientView';
import {animations} from '@assets/exporter';
import LottieView from 'lottie-react-native';

type IHomeEmptyProps = {
  retry: () => void;
};

const HomeEmpty: React.FC<IHomeEmptyProps> = ({retry}) => {
  return (
    <View style={{flex: 1}}>
      <LottieView
        autoPlay
        resizeMode="cover"
        loop
        style={styles.lottie}
        source={animations.something_went_wrong}
      />
      <View className="self-center top-[50%] absolute">
        <Text className="text-white text-2xl font-medium">
          !OPPS Something went wrong
        </Text>
        <TouchableOpacity onPress={retry}>
          <GradientView customClass="w-40 justify-center items-center mt-6 self-center rounded-md h-10">
            <Text className="text-black font-medium text-xl">Retry</Text>
          </GradientView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeEmpty;

const styles = StyleSheet.create({
  lottie: {
    width: '70%',
    alignSelf: 'center',
    height: '50%',
    marginTop: '30%',
  },
});
