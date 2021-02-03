import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '@screens/main';
import LoginScreen from '@screens/login';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MainScreen"
          component={MainScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigator;
