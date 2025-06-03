import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                    case 'Home': iconName = 'home'; break;
                    case 'Services': iconName = 'briefcase'; break;
                    case 'Bookings': iconName = 'calendar'; break;
                    case 'Profile': iconName = 'person'; break;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
        
        >
            <Tab.Screen name="Home" component={HomeScreen}  />
            <Tab.Screen name="Services" component={ServiceScreen} />
            <Tab.Screen name="Bookings" component={BookingScreen} /> 
            <Tab.Screen name="Profile" component={ProfileScreen} /> 
            
        </Tab.Navigator>
    );
}
export default BottomTab;
