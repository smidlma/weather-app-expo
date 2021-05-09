import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import config from '../../config';

const DailyForecast = (props) => {
  const { data } = props;
  return (
    <ScrollView style={{ flex: 1 }}>
      {data.map((x, idx) => (
        <View key={idx} style={styles.list}>
          <Text style={{ ...styles.text, flex: 0.6, paddingLeft: 20 }}>
            {new Date(x.dt * 1000).toLocaleString('default', {
              weekday: 'long',
            })}
          </Text>
          <Image
            style={{ width: 55, height: 55 }}
            source={{
              uri: `${config.ICONS_URL}${x.weather[0].icon}.png`,
            }}
          />
          <Text style={{ ...styles.text, flex: 0.4 }}>
            {x.temp.day.toFixed(1)}°
          </Text>
          <Text style={{ ...styles.text, flex: 0.4 }}>
            {x.temp.night.toFixed(1)}°
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
});

export default DailyForecast;
