import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import DonationScreen from './screens/DonationScreen';
import ThankYouScreen from './screens/ThankYouScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Donation" component={DonationScreen} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
