import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './navigation/BottomTab';
import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTab}  />
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}
