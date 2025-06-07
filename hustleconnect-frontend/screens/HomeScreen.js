import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Dimensions, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  // State variables
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch services and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, categoriesRes, allServicesRes] = await Promise.all([
          fetch("http://192.168.1.137:5000/api/services/featured"),
          fetch("http://192.168.1.137:5000/api/categories"),
          fetch("http://192.168.1.137:6000/api/services")
        ]);

        const featuredData = await featuredRes.json();
        const categoriesData = await categoriesRes.json();
        const allServicesData = await allServicesRes.json();

        setFeaturedServices(Array.isArray(featuredData) ? featuredData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setAllServices(Array.isArray(allServicesData) ? allServicesData : []);
        setFilteredServices(allServicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const filtered = allServices.filter(service => service.categoryId === categoryId);
    setFilteredServices(filtered);
  };

  // Handle search input
  useEffect(() => {
    if (search.trim() === "") {
      if (selectedCategoryId) {
        setFilteredServices(allServices.filter(s => s.categoryId === selectedCategoryId));
      } else {
        setFilteredServices(allServices);
      }
    } else {
      const filtered = allServices.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [search]);

  // Carousel Item
  const renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => navigation.navigate("ServiceDetail", { serviceId: item._id })}
      >
        <Image source={{ uri: item.image }} style={styles.carouselImage} />
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselPrice}>Ksh. {item.price}</Text>
      </TouchableOpacity>
    );
  };

  // Render category in 2-column grid
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryBox}
      onPress={() => handleCategorySelect(item._id)}
    >
      <Ionicons name={item.icon || "apps"} size={40} color="#ff9900" />
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render service card
  const renderServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate("ServiceDetail", { serviceId: item._id })}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.servicePrice}>Ksh. {item.price}</Text>
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

        <View style={styles.logoContainer}>
            <Image
                source={require('../assets/hustle-connectlogo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        
      {/* Welcome user */}
      <Text style={styles.welcomeText}>Welcome, {user.name || "Guest"}</Text>
      </View>

      {/* Search bar with filter */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#ff9900" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSearch(""); // reset search
            setFilteredServices(allServices); // show all services
            setSelectedCategoryId(null); // reset filter
          }}
        >
          <Ionicons name="filter" size={24} color="#ff9900" />
        </TouchableOpacity>
      </View>

      {/* Featured services carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={screenWidth}
          height={200}
          autoPlay={true}
          data={featuredServices}
          scrollAnimationDuration={1000}
          renderItem={renderCarouselItem}
        />
      </View>

      {/* Categories section (2 columns) */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.categoriesGrid}
      />

      {/* Services section */}
      <Text style={styles.sectionTitle}>Services</Text>
      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.servicesGrid}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      marginTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 2,
    },
    logo: {
        width: 50,
        height: 50
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333",
      marginLeft: 10,
      marginTop: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginLeft: 10,
    },
    filterButton: {
      paddingHorizontal: 10,
    },
    carouselContainer: {
      marginBottom: 20,
    },
    carouselItem: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 10,
      alignItems: "center",
      overflow: "hidden",
      elevation: 2,
    },
    carouselImage: {
      width: "100%",
      height: 150,
      borderRadius: 8,
    },
    carouselTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
    },
    carouselPrice: {
      fontSize: 14,
      color: "#ff9900",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: "#333",
    },
    categoriesGrid: {
      paddingBottom: 10,
    },
    categoryBox: {
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      alignItems: "center",
      width: "48%",
      elevation: 1,
    },
    categoryTitle: {
      marginTop: 5,
      fontSize: 14,
      textAlign: "center",
    },
    servicesGrid: {
      paddingBottom: 30,
    },
    serviceCard: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      width: "48%",
      alignItems: "center",
      elevation: 2,
    },
    serviceImage: {
      width: "100%",
      height: 100,
      borderRadius: 8,
    },
    serviceTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 5,
    },
    servicePrice: {
      fontSize: 13,
      color: "#ff9900",
      marginTop: 3,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  