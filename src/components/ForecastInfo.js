import React from 'react';
import { useState } from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';

const screenWidth = Dimensions.get('window').width;

const ForecastInfo = (props) => {
  const { forecast } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 20, fontWeight: '300'}}>Forecast</Text>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}></View>
      <View style={{ flex: 0.3 }}>
        <HourlyForecast data={forecast.hourlyForecast} />
      </View>
      <View style={{ flex: 0.7 ,  alignSelf: 'stretch'}}>
        <DailyForecast data={forecast.dailyForecast} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default ForecastInfo;
