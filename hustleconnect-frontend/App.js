import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './navigation/BottomTab';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    
      <AuthProvider>
       <BookingProvider>
        <NavigationContainer>
         <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={BottomTab}  />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{headerShown: true, title:'Service Detail'}} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: true, title:'Sign Up'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true, title:'Login'}} />
         </Stack.Navigator>
        </NavigationContainer> 
      </BookingProvider> 
      </AuthProvider>
    
    
  );
}
