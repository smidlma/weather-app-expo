import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AutocompleteInput from 'react-native-autocomplete-input';


const TopBar = (props) => {
  const { setLocation, setCity, setLoading, setSearchText, searchText } = props;

  const getLocation = async () => {
    console.log('Geolocation fired');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      //setErrorMsg('Permission to access location was denied');
      return;
    }
    setLoading(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLoading(false);
  };

  



  // const whisperCity = (str) => {
  //   fetchCityList(str);
  // }


  const searchCity = () => {
    // setShowWhisper(false);
    // setCities([]);
    setCity(searchText);
  };

  return (


    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons
          style={{ flex: 0.1, paddingLeft: 5, paddingRight: 10, }}
          name="md-search"
          size={32}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search city"
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={searchCity}
          value={searchText}
        />

      </View>
      <View style={styles.location}>
        <Ionicons name="md-location" size={32} onPress={getLocation} />
      </View>
    </View>



  );
};

const styles = StyleSheet.create({
  whisperer: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'white',
    width: 240,
    borderRadius: 10,
    height: 500
  },
  whisperer__item: {
    width: 200,
    fontSize: 20,


  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  location: {
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center'
  },
  searchInput: {
    flex: 0.8,
    paddingLeft: 10,
    // borderWidth: 1,
    // borderRadius: 6,
    // padding: 10,
    // width: '70%',
  },
  search: {
    flex: 0.7,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default TopBar;
