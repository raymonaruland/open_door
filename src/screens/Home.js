import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToOwnerScreen = () => {
    navigation.navigate('Owner');
  };

  const navigateToGuestScreen = () => {
    navigation.navigate('Guest');
  };

  return (
    <ImageBackground source={require('../../assets/backDoor.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={navigateToOwnerScreen}>
          <Icon name="home" size={30} color="black" />
          <Text style={styles.buttonText}>Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToGuestScreen}>
          <Icon name="person" size={30} color="black" />
          <Text style={styles.buttonText}>Guest</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
  },
});

export default HomeScreen;
