import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

const ServiceDetailScreen = ({ route }) => {
    const navigation = useNavigation();


    const {service} = route.params;
    const [selectedDate, setSelectedDate ]= useState(new Date());
    const [showPicker,setShowPicker] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [time, setTime] = useState(new Date());

    const handleDateChange = (event, date) => {
        setShowPicker(false);
        if(date) {
            setSelectedDate(date);
            const today = newDate();
            const diff = (date-today)/(1000*3600*24);
            setIsAvailable(diff>=1);//Available if booking date is 1 day ahead
        }
    };
    const handleTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if(selectedTime) {
            setTime(selectedTime);
        }
    };
    const handleBooking = () => {
        if (!isAvailable) return alert('Booking is not available for this date');
        alert(`Booking confirmed for ${service.title} on ${selectedDate.toLocaleDateString()} at ${time.toLocaleTimeString()}`);
};

return (
    <View style ={styles.container}>
        
        <Image
        source={{uri: service.image || 'https://via.placeholder.com/150'}}
        style={styles.image}
        />
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>
        <Text style={styles.price}>Price: Ksh{service.price}</Text>
        <Text style={styles.category}>Category: {service.category.name}</Text>
        <Text style={styles.vendor}>By: {service.User?.name || "Unknown"}</Text>

        <Text style={styles.dateText}>Select Date:</Text>

        <TouchableOpacity 
        onPress={() => setShowPicker(true)}
        style={styles.dateButton}
        >
            <Ionicons name="calendar" size={24} color="black" />
        <Text style={styles.date}>{selectedDate.toLocaleDateString()}</Text>
        
        </TouchableOpacity>

        {showPicker && (
            <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
            />
        )}

        isAvailable !== null && (
            <Text style={styles.availabilityText}>
                {isAvailable ? "Available" : "Not Available"}
            </Text>

        )
        <TouchableOpacity 
        onPress={handleBooking}
        style={[styles.bookButton,
        {backgroundColor: isAvailable ? '#ff9900' : '#ccc'}]}
        disabled={!isAvailable}
        >
            <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
    </View>

    
)
};
export default ServiceDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'orange',
    },
    description: {
        fontSize: 15,
        marginBottom: 10,
        color: '#555',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    vendor: {
        fontSize: 14,
        color: '#777',
        marginBottom: 15,
    },
    
    category: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        width: '50%',
        borderColor: '#ddd',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
        marginRight: 10,
    },
    
    date: {
        fontSize: 16,
        marginLeft: 15,

    },
    availabilityText: {
        fontSize: 16,
        marginBottom: 20,
        marginVertical: 10,
        fontWeight:600,
    },
    bookButton: {
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'orange',
    },
    bookButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    
})