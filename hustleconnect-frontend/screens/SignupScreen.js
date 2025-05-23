import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const SignupScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role
    const [loading, setLoading] = useState(false);


    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            return Alert.alert("Error", "Please fill in all fields");
        }

        //Alert.alert("Success", "Account created successfully");
        //navigation.navigate("Login");

        const emailRegex = /\S+@\S+\.\S+/;
        if(!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return false;
        }
        if(password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSignup = async() => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch("http://192:168.1.137:5000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
                });
                const data = await response.json();

                if (response.ok) {
                    throw new Error(data.message || 'Signup failed');
                }
                Alert.alert("Success", "Account created successfully");
                navigation.navigate("Login");
            
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };



    return(
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

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

            <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>Select Role:</Text>
                <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={styles.picker}>
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Vendor" value="vendor" />
                    
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                <Text style={styles.buttonText}>{loading? 'Signing up...': 'Sign Up'}</Text>
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
    roleContainer: {
        marginVertical: 10,

    },
    roleLabel: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft:5,
    },
    picker: {
        borderWidth: 1,
        borderColor: "#ddd",
        height: 50,
    },

})