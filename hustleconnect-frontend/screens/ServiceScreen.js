import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList, TouchableOpacity,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const placeholderImage = 'https://via.placeholder.com/150';

const ServiceScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const navigation = useNavigation();

  const fetchServices = async () => {
    try {
        const response = await fetch('http://192.168.1.137:6000/api/services');
        const data = await response.json();
        setServices(data);
        setFilteredServices(data);

        const uniqueCategories = [...new Set(data.map(service => service.category?.name))];
        setCategories(uniqueCategories);
    } catch (error) {
        console.error('Error fetching services:', error);
    } finally {
        setLoading(false);
    }
 };


  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.category?.name?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
        // Reset filter if clicked again
        setSelectedCategory(null);
        setFilteredServices(services);
        return;
    }

    setSelectedCategory(category);
    const filtered = services.filter(service =>
        service.category?.name === category
    );
    setFilteredServices(filtered);
 };


  const handleClear = () => {
    setSearchQuery('');
    setFilteredServices(services);
  };

  const handleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderService = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <Image
        source={{ uri: item.image || placeholderImage }}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => handleFavorite(item._id)}
      >
        <Ionicons
          name={favorites[item._id] ? 'heart' : 'heart-outline'}
          size={22}
          color={favorites[item._id] ? 'red' : '#555'}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>Ksh {item.price}</Text>

      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
      >
        <Ionicons name="calendar" size={18} color="#000" />
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

        <View style={styles.categoryContainer}>
        <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={[
                styles.chip,
                selectedCategory === item && styles.selectedChip
                ]}
                onPress={() => handleCategorySelect(item)}
            >
                <Text
                style={[
                    styles.chipText,
                    selectedCategory === item && styles.selectedChipText
                ]}
                >
                {item}
                </Text>
            </TouchableOpacity>
            )}
        />
        </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff9900" />
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item._id}
          renderItem={renderService}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.noResult}>No Results Found</Text>}
        />
      )}
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      paddingTop: 50,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingHorizontal: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ff9900',
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginLeft: 30,
      color: '#333',
    },
    searchIcon: {
      position: 'absolute',
      left: 10,
    },
    clearButton: {
      marginLeft: 10,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#eee',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 10,
    },
    favoriteIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#fff',
      padding: 5,
      borderRadius: 20,
      zIndex: 1,
      elevation: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
      marginBottom: 5,
    },
    price: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
    },
    bookBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ff9900',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    bookBtnText: {
      fontSize: 14,
      color: '#000',
      marginLeft: 6,
    },
    noResult: {
      textAlign: 'center',
      fontSize: 16,
      color: '#999',
      marginTop: 30,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingVertical: 5,
      },
      
      chip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 10,
      },
      
      selectedChip: {
        backgroundColor: '#ff9900',
      },
      
      chipText: {
        color: '#333',
        fontSize: 14,
      },
      
      selectedChipText: {
        color: 'white',
        fontWeight: '600',
      },
      
  });
  
