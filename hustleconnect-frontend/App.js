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
import HeroScreen from './screens/HeroScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
       <BookingProvider>
        <NavigationContainer>
         <Stack.Navigator initialRouteName='HeroScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name="HeroScreen" component={HeroScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: true, title:'Sign Up'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true, title:'Login'}} />
          <Stack.Screen name="Main" component={BottomTab}  />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{headerShown: true, title:'Service Detail'}} />
         </Stack.Navigator>
        </NavigationContainer> 
      </BookingProvider> 
      </GestureHandlerRootView>
    </AuthProvider>
    
    
    
  );
}
