import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DashBoard from './screens/DashBoard';
import CreateCustomer from './screens/CreateCustomer';
import CreateLoan from './screens/CreateLoan';
const navigationStack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <navigationStack.Navigator initialRouteName='Login'>
        <navigationStack.Screen name="Home" component={HomeScreen} />
        <navigationStack.Screen name="Login" component={LoginScreen} />
        <navigationStack.Screen name="DashBoard" component={DashBoard} />
        <navigationStack.Screen name="CreateCustomer" component={CreateCustomer} />
        <navigationStack.Screen name="CreateLoan" component={CreateLoan} />
      </navigationStack.Navigator> 
    </NavigationContainer>
   
  );
}