import React, {useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";



const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    

    const handleLogin =  async() => {
        if (!email || !password) {
            return Alert.alert("Error", "Please fill in all fields");
        }
        try{
            const response = await fetch("http://192.168.1.137:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            login(data.user);//save user data in context
            navigation.navigate("Main");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }

        };

        

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputWrapper}>
             <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput 
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            />
            </View>

            <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput 
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#999"
                />
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

        </View>
        
    );
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff9900',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingRight: 10, // for spacing before the icon
      },
    button: {
        backgroundColor: '#ff9900',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    googlebutton: {
        backgroundColor: '#4285F4',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 10,
    },
    
});