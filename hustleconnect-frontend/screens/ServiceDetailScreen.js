import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const ServiceDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { addBooking } = useContext(BookingContext);
    const {service} = route.params;

    const [selectedDate, setSelectedDate ]= useState(new Date());
    const [showPicker,setShowPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [time, setTime] = useState(new Date());

    const handleDateChange = (event, date) => {
        setShowPicker(false);
        if(date) {
            setSelectedDate(date);
            const today = new Date();
            const diff = (date - today)/(1000*3600*24);
            setIsAvailable(diff >= 1);//Available if booking date is 1 day ahead
        }
    };
    const handleTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if(selectedTime) {
            setTime(selectedTime);
        }
    };
    const handleBooking = () => {
        if (!isAvailable) {
            Alert.alert('Booking is not available for this date');
            return;
        }
        

        const newBooking = {
            id: Date.now().toString(),
            serviceId: service._id,
            title: service.title,
            description: service.description,
            price: service.price,
            date: selectedDate.toLocaleDateString(),
            time: time.toLocaleTimeString(),
        }
        addBooking(newBooking);
        Alert.alert('Booking Confirmed', `${service.title} booked for ${newBooking.date} at ${newBooking.time}`);
        navigation.navigate('Main', {screen: 'Bookings'});
};

return (
    <View style={styles.container}>
  <Image
    source={{ uri: service.image || 'https://via.placeholder.com/150' }}
    style={styles.image}
  />

  <View style={styles.infoCard}>
    <Text style={styles.title}>{service.title}</Text>
    <Text style={styles.description}>{service.description}</Text>

    <View style={styles.infoRow}>
      <Ionicons name="pricetag" size={18} color="#555" />
      <Text style={styles.price}>Ksh {service.price}</Text>
    </View>

    <View style={styles.infoRow}>
      <Ionicons name="layers-outline" size={18} color="#555" />
      <Text style={styles.category}>Category: {service.category?.name}</Text>
    </View>

    <View style={styles.infoRow}>
      <Ionicons name="person-outline" size={18} color="#555" />
      <Text style={styles.vendor}>By: {service.User?.name || "Unknown"}</Text>
    </View>
  </View>

  {/* Date Picker */}
  <Text style={styles.label}>Select Date</Text>
  <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateTimeButton}>
    <Ionicons name="calendar-outline" size={22} color="#333" />
    <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
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

  {/* Time Picker */}
  <Text style={styles.label}>Select Time</Text>
  <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
    <Ionicons name="time-outline" size={22} color="#333" />
    <Text style={styles.dateText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
  </TouchableOpacity>
  {showTimePicker && (
    <DateTimePicker
      value={time}
      mode="time"
      display="default"
      onChange={handleTimeChange}
    />
  )}

  {/* Availability */}
  {isAvailable !== null && (
    <Text style={[styles.availabilityText, { color: isAvailable ? 'green' : 'red' }]}>
      {isAvailable ? 'Available for booking' : 'Not available – choose a future date'}
    </Text>
  )}

  {/* Confirm Button */}
  <TouchableOpacity
    onPress={handleBooking}
    style={[styles.bookButton, { backgroundColor: isAvailable ? '#ff9900' : '#ccc' }]}
    disabled={!isAvailable}
  >
    <Text style={styles.bookButtonText}>Confirm Booking</Text>
  </TouchableOpacity>
</View>
    );

};
export default ServiceDetailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    image: {
      width: '100%',
      height: 220,
      borderRadius: 12,
      marginBottom: 20,
      resizeMode: 'cover',
    },
    infoCard: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      elevation: 2,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#ff9900',
      marginBottom: 5,
    },
    description: {
      fontSize: 15,
      color: '#555',
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
      color: '#333',
    },
    category: {
      fontSize: 15,
      color: '#333',
      marginLeft: 8,
    },
    vendor: {
      fontSize: 14,
      color: '#666',
      marginLeft: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 6,
      color: '#333',
    },
    dateTimeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      marginBottom: 15,
      backgroundColor: '#fafafa',
    },
    dateText: {
      fontSize: 16,
      marginLeft: 12,
      color: '#333',
    },
    availabilityText: {
      fontSize: 15,
      fontWeight: 'bold',
      marginVertical: 12,
    },
    bookButton: {
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    bookButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  