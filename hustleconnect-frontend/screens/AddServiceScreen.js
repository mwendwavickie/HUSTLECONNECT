import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    ActivityIndicator,
    ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AddServiceScreen = () => {
    const { user, token } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://192.168.1.137:5000/api/categories");
                const data = await res.json();
                if (Array.isArray(data)) setCategories(data);
                else setCategories([]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const pickImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission denied", "We need access to your media library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission denied", "We need access to your camera.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

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
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: parseFloat(price),
                    category: selectedCategory,
                    location,
                    contact,
                    image, // You may want to convert to base64 for real upload
                }),
            });

            if (!res.ok) throw new Error("Failed to add service");
            Alert.alert("Success", "Service added successfully!");

            setTitle("");
            setDescription("");
            setPrice("");
            setSelectedCategory("");
            setLocation("");
            setContact("");
            setImage(null);
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Service</Text>

            {image && (
                <Image source={{ uri: image }} style={styles.previewImage} />
            )}

            <View style={styles.imageButtonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={pickImageFromGallery}>
                    <MaterialIcons name="photo-library" size={24} color="#fff" />
                    <Text style={styles.iconButtonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="#fff" />
                    <Text style={styles.iconButtonText}>Camera</Text>
                </TouchableOpacity>
            </View>


            <TextInput
                style={styles.input}
                placeholder="Service Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 80 }]}
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
        </ScrollView>
    );
};

export default AddServiceScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: '100%',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ff9900',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    imageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ff9900',
    },
    
    iconButtonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    
});
