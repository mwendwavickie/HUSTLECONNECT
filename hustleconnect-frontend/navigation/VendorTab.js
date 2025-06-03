import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddServiceScreen from "../screens/AddServiceScreen";
import VendorBookingScreen from "../screens/VendorBookingScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const VendorTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen 
                name="AddService"
                component={AddServiceScreen}
                options={{
                    tabBarLabel: "Add Service",
                    tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
                }}
                />
                <Tab.Screen 
                name="MyBookings"
                component={VendorBookingScreen}
                options={{
                    tabBarLabel: "My Bookings",
                    tabBarIcon: ({ color, size }) => <Ionicons name="bookmarks-outline" size={size} color={color} />,
                }}
                />
                

        </Tab.Navigator>
    );
};

export default VendorTab;
