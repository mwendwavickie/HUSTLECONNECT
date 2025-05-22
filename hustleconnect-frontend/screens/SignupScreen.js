import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignup = () => {
        if (!name || !email || !password || !confirmPassword) {
            return Alert.alert("Error", "Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return Alert.alert("Error", "Passwords do not match");
        }

        Alert.alert("Success", "Account created successfully");
        navigation.navigate("Login");
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            />

            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

            <TextInput 
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title:{
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#ff9900",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 14,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#ff9900",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        color: "#333",
        marginTop: 15,
        textAlign: "center",
    },
    



})