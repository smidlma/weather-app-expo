import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const LoadIndicator = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        opacity: 0.3,
        backgroundColor: 'black',

        zIndex: 2,
      }}
    >
      <View
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    </View>
  );
};

export default LoadIndicator;
