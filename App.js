import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedbackBase,
  View,
} from 'react-native';
import config from './config';
import ForecastInfo from './src/components/ForecastInfo';
import LoadIndicator from './src/components/LoadIndicator';
import TopBar from './src/components/TopBar';
import WeatherInfo from './src/components/WeatherInfo';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Praha');
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState({
    dailyForecast: [],
    hourlyForecast: [],
  });
  const [currWeather, setcurrWeather] = useState({
    city: '',
    sunrise: '',
    sunset: '',
    desc: '',
    temp: '',
    icon: '',
  });

  const fetchWeather = async () => {
    try {
      const currUrl = `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.API_KEY}`;
      const forecastUrl = `https://pro.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${config.API_KEY}`;
      const hourlyForecastUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&cnt=18&appid=${config.API_KEY}`;

      const responseCurr = await fetch(currUrl);
      const dataCurr = await responseCurr.json();
      const responseForecast = await fetch(forecastUrl);
      const dataForecast = await responseForecast.json();
      const responseHourlyForecast = await fetch(hourlyForecastUrl);
      const dataHourlyForecast = await responseHourlyForecast.json();

      console.log(dataCurr);
      console.log(dataForecast);
      console.log(dataHourlyForecast);

      setcurrWeather({
        ...currWeather,
        city: dataCurr.name,
        sunrise: new Date(dataCurr.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(dataCurr.sys.sunset * 1000).toLocaleTimeString(),
        desc: dataCurr.weather[0].description,
        temp: `${dataCurr.main.temp.toFixed(1)}°`,
        icon: `${config.ICONS_URL}${dataCurr.weather[0].icon}@2x.png`,
      });

      setForecast({
        dailyForecast: dataForecast.list,
        hourlyForecast: dataHourlyForecast.list,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (city === null) return;
    fetchWeather();
  }, [city]);

  useEffect(() => {
    const fetchLocationWeather = async () => {
      try {
        const url = `https://pro.openweathermap.org/data/2.5/find?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt=1&appid=62b82ba109f836c42c7ca88f13598612`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();

        setCity(data.list[0].name);
      } catch (err) {
        console.log(err);
      }
    };
    if (location === null) return;
    fetchLocationWeather();
  }, [location]);

  return (
    <ImageBackground
      source={require('./assets/2248.jpg')}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
    >
      {loading ? <LoadIndicator /> : null}
      {/* TODO: Dismims keyboard */}
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.top}>
          <TopBar
            setLocation={setLocation}
            setCity={setCity}
            setLoading={setLoading}
          />
        </View>
        <View style={styles.middle}>
          <WeatherInfo weather={currWeather} />
        </View>
        <View style={styles.bottom}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              //  backgroundColor: 'cyan',
            }}
          ></View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderTopLeftRadius: 75,
              borderTopRightRadius: 0,
            }}
          >
            <ForecastInfo forecast={forecast} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top: {
    flex: 0.095,
    // backgroundColor: 'cyan',
    alignSelf: 'stretch',
  },
  middle: {
    flex: 0.38,
    //  backgroundColor: 'cyan',
    alignSelf: 'stretch',
    borderBottomRightRadius: 75,
  },
  bottom: {
    flex: 0.52,
    alignSelf: 'stretch',
  },
});
