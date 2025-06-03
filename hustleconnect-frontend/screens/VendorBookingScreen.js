import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator,  } from "react-native";
import { AuthContext } from "../context/AuthContext";


const VendorBookingScreen = () => {
    const { user, token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch (`http://192.168.1.137:5000/api/bookings/vendor/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();
                setBookings(data)
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBookings();
        }, []);

        if (loading) return <ActivityIndicator size="large" style={{flex:1}} />;

    return (
        <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.bookingTitle}>{item.service.title}</Text>
                    <Text>Booked By:{item.customerName} </Text>
                    <Text style={styles.bookingDate}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                    <Text style={styles.bookingStatus}>Status: {item.status}</Text>
                </View>
            )}
            contentContainerStyle={styles.container}
            />
    );
}
export default VendorBookingScreen;

const styles = StyleSheet.create({
    card:{
        padding: 16,
        margin: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 1,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    bookingDate: {
        fontSize: 14,
        color: "#666",
    },
    bookingStatus: {
        fontSize: 14,
        color: "#ff9900",
    },
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
})