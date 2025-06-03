import react, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import { AuthContext } from "../context/AuthContext";

const AddServiceScreen = () => {
    const { user, token } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleAddService = async () => {
        try {
            const res = await fetch("http://192.168.1.137:5000/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: parseFloat(price),
                    category,
                    location,
                    contact,
                    image, // Assuming image is a URL or base64 string
                }),
            });
            if (!res.ok) throw new Error("Failed to add service");
            Alert.alert("Sucess, Service added successfully!");
            // Reset form fields
            setTitle("");
            setDescription("");
            setPrice("");
            setCategory("");
            setLocation("");
            setContact("");
            setImage(null);
            }catch (error) {
                    Alert.alert("Error", error.message || "Something went wrong");
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
                        placeholder="Category"
                        value={category}
                        onChangeText={setCategory}
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
                    
                    <TouchableOpacity
                        style={styles.button}
                        title={loading ? "Submitting..." : "Submit Service"}
                        onPress={handleAddService}
                        disabled={loading}
                    />

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
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: 50,
        alignItems: 'center',
    },
});
