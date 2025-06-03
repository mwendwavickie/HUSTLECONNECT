import React, { useContext } from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';
import { BookingContext } from '../context/BookingContext';


const BookingScreen = ()=> {
    const { bookings } = useContext (BookingContext);

    const renderBookings = ({ item }) => {
        return (
            <View style={styles.card} key={item.id}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>Price: Ksh {item.price}</Text>
                <Text>Date:{item.date} </Text>
                <Text>Time:{item.time} </Text>
            </View>
        )
        
    }

    return(
        <View style={{flex: 1, padding: 20, marginTop: 50}}>
            <Text style={styles.header}>My Bookings</Text>
            <FlatList 
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={renderBookings}
            ListEmptyComponent={<Text style={styles.noResult}>No Bookings Yet</Text>}
            />
        </View>
    );
}
export default BookingScreen;

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,

    }
});