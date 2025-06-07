import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const VendorBookingScreen = () => {
    const { user, token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(
                    `http://192.168.1.137:5000/api/bookings/vendor/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff9900" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>My Bookings</Text>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.bookingTitle}>{item.service.title}</Text>
                        <View style={styles.row}>
                            <FontAwesome name="user" size={18} color="#333" style={styles.icon} />
                            <Text style={styles.detailText}>Booked by: {item.customerName}</Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="date-range" size={18} color="#333" style={styles.icon} />
                            <Text style={styles.detailText}>
                                Date: {new Date(item.date).toLocaleDateString()}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <MaterialIcons name="check-circle" size={18} color="#ff9900" style={styles.icon} />
                            <Text style={styles.statusText}>Status: {item.status}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default VendorBookingScreen;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 15,
        textAlign: "center",
        color: "#333",
    },
    container: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: "#f4f4f4",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    icon: {
        marginRight: 8,
    },
    detailText: {
        fontSize: 14,
        color: "#555",
    },
    statusText: {
        fontSize: 14,
        color: "#ff9900",
        fontWeight: "600",
    },
});
