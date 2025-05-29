import React,{useContext} from 'react';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from './navigation/BottomTab';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import HeroScreen from './screens/HeroScreen';
import HomeScreen from './screens/HomeScreen';
import { ActivityIndicator } from 'react-native';


const Stack = createNativeStackNavigator(); 

const MainNavigator = () => {
  return (

         <Stack.Navigator initialRouteName='HeroScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name="HeroScreen" component={HeroScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: true, title:'Sign Up'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true, title:'Login'}} />
          <Stack.Screen name="Main" component={BottomTab}  />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{headerShown: true, title:'Service Detail'}} />
         </Stack.Navigator>
  );

};

const AppContent = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated === null) {
    return <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />;
  }
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BookingProvider>
           <AppContent />
          </BookingProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    
  );
}