import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput,Dimensions, Image  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Carousel  from "react-native-reanimated-carousel";


const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
    const { user } = useContext(AuthContext); //Logged in user
    const carouselRef = useRef(null);
    const navigation = useNavigation();

    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, categoriesRes ] = await Promise.all([
                    fetch("http://192.168.1.137:5000/api/services/featured"),
                    fetch("http://192.168.1.137:5000/api/categories")
                ]);
    
                const servicesData = await servicesRes.json();
                const categoriesData = await categoriesRes.json();
    
                // in useEffect
                setFeaturedServices(Array.isArray(servicesData) ? servicesData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []);


            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }  
        };
        fetchData();
    }, []);

    const renderCarouselItem = ({ item }) => {
        console.log("Carousel item:", item); //  Add this
    
        if (!item || !item.image || !item.title) {
            return <Text>Invalid item</Text>; // fallback
        }
    
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
    

    const renderCategory = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.categoryBox}
                onPress={() => navigation.navigate("CategoryServices", { categoryId: item._id })}
            >
                <Ionicons name={item.icon|| "apps"} size={50} color="#ff9900" />
                <Text style={styles.categoryTitle}>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff9900" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {user.name || "Guest"}</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#ff9900" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search services..."
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.filterButton} >
                    <Ionicons name="filter" size={24} color="#ff9900" />
                </TouchableOpacity>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel
                    loop
                    width={screenWidth}
                    height={200}
                    autoPlay={true}
                    data={Array.isArray(featuredServices) ? featuredServices : []}
                    scrollAnimationDuration={1000}
                    renderItem={renderCarouselItem}
                />
            </View>

            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.categoriesList}
            />
        </View>
            
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 50,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
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
        color:"#ff9900",
    },
    categoriesList:{
        paddingVertical :10
        
    },
    categoryBox:{
        backgroundColor:"#fff",
        borderRadius :8,
        padding :10,
        marginRight :10,
        alignItems:"center"
    },
    categoryTitle:{
        marginTop :5,
        fontSize: 14,
        textAlign: "center",
    }
});

