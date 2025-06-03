import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddServiceScreen from "../screens/AddServiceScreen";
import VendorBookingScreen from "../screens/VendorBookingScreen";
import HomeScreen from "../screens/HomeScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";

import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const VendorStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="VendorTab" component={VendorTab} />
        </Stack.Navigator>
    );
}

const VendorTab = () => {
    return (
        <Tab.Navigator 
        screenOptions={({route})=> ({
            tabBarIcon: ({color, size}) => {
                let iconName;

                if (route.name === "Dashboard") {
                    iconName = "home-outline";
                } else if (route.name === "AddService") {
                    iconName = "add-circle-outline";
                } else if (route.name === "MyBookings") {
                    iconName = "bookmarks-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: "#ff9900",
            tabBarInactiveTintColor: "gray",
        })}
        >
            <Tab.Screen name="Dashboard" component={VendorStack} />
            <Tab.Screen name="AddService" component={AddServiceScreen} />
            <Tab.Screen name="MyBookings" component={VendorBookingScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            
        </Tab.Navigator>
    );
};

export default VendorTab;
