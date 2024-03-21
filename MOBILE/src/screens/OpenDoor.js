// OpendoorScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OpendoorScreen = () => {
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title1}>Open Door</Text>
      <Text style={styles.title}>Click Here to Open the Door</Text>
      <TouchableOpacity onPress={navigateToHomeScreen}>
        <Image source={require('../../assets/door.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  title1: {
    fontSize: 26,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 300,
  },
});

export default OpendoorScreen;
