import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Picker } from '@react-native-picker/picker';


const AddServiceScreen = () => {
    const { user, token } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    //const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://192.168.1.137:5000/api/categories");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error("Invalid categories data:", data);
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                
            } finally {
                setLoading(false);
            }
        };
            fetchCategories();
        }, []);
                        

    const handleAddService = async () => {
        if (!title || !description || !price || !selectedCategory || !location || !contact) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch("http://192.168.1.137:5000/api/services", {
                method: "POST",
                headers: {
                    contentType: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: parseFloat(price),
                    category: selectedCategory,
                    location,
                    contact,
                    //image, // Assuming you have an image URL or base64 string
                }),
            });

            if (!res.ok)  throw new Error("Failed to add service");
            Alert.alert("Success", "Service added successfully!");

            // Reset form fields
            setTitle("");
            setDescription("");
            setPrice("");
            setSelectedCategory("");
            setLocation("");
            setContact("");
            //setImage(null);
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Service</Text>
            {/* <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            /> */}
            <TextInput 
                style={styles.input}
                placeholder="Service Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
                keyboardType='phone-pad'
            />

            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select a category..." value="" />
                {categories.map((cat) => (
                <Picker.Item label={cat.name} value={cat._id} key={cat._id} />
                ))}
            </Picker>
            
            <TouchableOpacity
                style={styles.button}
                onPress={handleAddService}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Submit Service</Text>
                )}
            </TouchableOpacity>

        </View>
    );
};
export default AddServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 6,
    },
    button: {
        backgroundColor: '#ff9900',
        color: '#fff',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        height: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        borderRadius: 5,
        height: 50,
        
    }
});
