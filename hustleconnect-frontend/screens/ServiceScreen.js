import react from 'react';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const ServiceScreen = ()=> {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://192.168.1.137:5000/api/services');
            const data = await response.json();
            console.log('Fetched services:', data);
            setServices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
        setLoading(false);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);

    const renderService = ({ item: service }) => {
        return(
            <View style={styles.card}>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.price}>Ksh.{service.price}</Text>
            <Text style={styles.vendor}>By: {service.User?.name || 'Unknown'}</Text>
        </View>
        ) 
    }
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Available Services</Text>
            {loading ? (
                <ActivityIndicator size="large" color= "blue" />
            ):(
                <FlatList
                data={services}
                keyExtractor={(service) => service._id}
                renderItem={renderService}
                contentContainerStyle={{paddingBottom: 20}}
                />
            )}
        </View>
    );
}
export default ServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius:8,
        elevation: 2,
        marginBottom: 15,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    vendor: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
    }
})
