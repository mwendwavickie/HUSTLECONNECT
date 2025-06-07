import react from 'react';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const placeholderImage = 'https://via.placeholder.com/150'; // Placeholder image URL

const ServiceScreen = ()=> {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);

    const navigation = useNavigation();
    

    const fetchServices = async () => {
        try {
            const response = await fetch('http://192.168.1.137:6000/api/services');
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
    const handleFavorite = (id) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };


    const renderService = ({ item: service }) => {
        return(
            <TouchableOpacity 
                style={styles.card}
                onPress={() => navigation.navigate('ServiceDetail', { service })} 
            >
                <Image
                    source={{ uri:'../Background.jpg' }}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={() => handleFavorite(service._id)}
                >
                    <Ionicons
                        name={favorites[service._id] ? 'heart' : 'heart-outline'}
                        size={22}
                        color={favorites[service._id] ? 'red' : '#555'}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.price}>Ksh.{service.price}</Text>
                
                <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => navigation.navigate('ServiceDetail', { service })}
                >
                    <Ionicons name="calendar" size={20} color="black" style={styles.bookBtnIcon} />
                <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>

            

            </TouchableOpacity>
            
        ) 
    }
    return(
        <View style={styles.container}>
            

            <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
            <TextInput 
            style={styles.searchInput}
            placeholder='Search services...'
            value={searchQuery}
            onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="gray" />
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
        marginTop: 50,
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
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        
    },
    searchInput: {
        flex: 1,
        height: 40,
        width: '80%',
        paddingLeft: 40,
    },
    searchIcon: {
        marginRight: 6,
        position: 'absolute',
        left: 10,
        top: 10,
    },
    clearButton: {
        marginLeft: 6,
        right: 2,
        top: 10,

    },
    searchText: {
        fontSize: 16,
        color: '#333',
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
        borderWidth: 1,
        borderColor: '#ff9900',
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    vendor: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
    },
    bookBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff9900',
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 10,
    },
    bookBtnText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 15,
    },
    bookBtnIcon: {
        marginLeft: 10,
    },
    noResult: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
    },

})
