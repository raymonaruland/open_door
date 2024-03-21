import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/Home';
import OwnerScreen from './src/screens/Owner';
import GuestScreen from './src/screens/Guest';
import OpendoorScreen from './src/screens/OpenDoor';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Owner" component={OwnerScreen} />
        <Stack.Screen name="Guest" component={GuestScreen} />
        <Stack.Screen name="Door" component={OpendoorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
