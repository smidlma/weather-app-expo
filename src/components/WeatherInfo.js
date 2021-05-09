import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const WeatherInfo = (props) => {
  const { weather } = props;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        <Text style={{ color: 'white' }}>
          {<Feather name="sunrise" color="white" />}
          {weather.sunrise}
        </Text>
        <Text style={{color: 'white'}}> | </Text>
        <Text style={{color: 'white'}}>
          {<Feather name="sunset" color="white" />} {weather.sunset}
        </Text>
      </View>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.city}>{weather.city}</Text>
      </View>
      <View style={{ flex: 0.4 }}>
        <Text style={styles.teprature}>{weather.temp}</Text>
      </View>
      <View style={{ flex: 0.3 }}>
        {/* <Text style={{ textAlign: 'center' }}>{weather.desc}</Text> */}
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: weather.icon,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  city: {
    fontSize: 50,
    fontWeight: '200',
    color: 'white',
  },
  teprature: {
    fontSize: 100,
    fontWeight: '100',
    marginLeft: 20,
    color: 'white',
  },
});

export default WeatherInfo;
