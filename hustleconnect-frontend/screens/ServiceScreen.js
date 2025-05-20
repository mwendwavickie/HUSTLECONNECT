import react from 'react';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList, TouchableOpacity} from 'react-native';
//import { FlatList, TextInput } from 'react-native-gesture-handler';


const ServiceScreen = ()=> {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchServices = async () => {
        try {
            const response = await fetch('http://192.168.1.137:5000/api/services');
            const data = await response.json();
            console.log('Fetched services:', data);
            setServices(data);
            setFilteredServices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
        setLoading(false);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);

    const handleSearch =(query) => {
        setSearchQuery(query);
        const filtered = services.filter(service => 
            service.category.name.toLowerCase().includes(query.toLowerCase()) ||
            service.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
    }
    const handleClear = () => {
        setSearchQuery('');
        setFilteredServices(services);
    };


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

            <View style={styles.searchContainer}>
            <TextInput 
            style={styles.searchInput}
            placeholder='Search services...'
            value={searchQuery}
            onChangeText={handleSearch}
            />

            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text>clear</Text>
            </TouchableOpacity>

            </View>

            

            {loading ? (
                <ActivityIndicator size="large" color= "blue" />
            ):(
                <FlatList
                data={filteredServices}
                keyExtractor={(service) => service._id}
                renderItem={renderService}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{paddingBottom: 20}}
                ListEmptyComponent={<Text style={styles.noResult}> No Results Found</Text>}
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
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        
    },
    clearButton: {
        borderColor: 'orange',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        height: 40,
    },
    searchInput: {
        height: 40,
        width: '80%',
        borderColor: 'orange',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius:8,
        elevation: 2,
        marginBottom: 15,
        width: '48%',
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
    },
    noResult: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 20,
    }
})
