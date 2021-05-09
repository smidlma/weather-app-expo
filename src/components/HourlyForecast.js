import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import config from '../../config';

const HourlyForecast = (props) => {
  const { data } = props;
  const temp = [1, 2, 3];
  return (
    <ScrollView horizontal={true} style={styles.scroll}>
      {data.map((x, idx) => (
        <View key={idx} style={styles.list}>
          <Text style={styles.text}>{new Date(x.dt * 1000).getHours()}:00</Text>
          <Image
            style={{ width: 50, height: 50, flex: 0.6 }}
            source={{
              uri: `${config.ICONS_URL}${x.weather[0].icon}.png`,
            }}
          />
          <Text style={styles.text}>{x.main.temp.toFixed(1)}°</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    borderColor: '#d3e1f0',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  list: {
    flex: 1,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default HourlyForecast;
