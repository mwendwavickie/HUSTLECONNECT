import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return false;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return false;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch("http://192.168.1.137:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Signup failed");

            login(data.user);
            Alert.alert("Success", "Account created successfully");
            navigation.navigate("Main");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Create Account</Text>

                {/* Name */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-circle-outline" size={22} color="#ff9900" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                </View>

                {/* Email */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={22} color="#ff9900" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#ff9900" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#ff9900" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Role Picker */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.roleLabel}>Select Role:</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={role}
                            onValueChange={setRole}
                            style={styles.picker}
                            dropdownIconColor="#ff9900"
                        >
                            <Picker.Item label="User" value="user" />
                            <Picker.Item label="Vendor" value="vendor" />
                        </Picker>
                    </View>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                    style={[styles.button, loading && { backgroundColor: "#ccc" }]}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
                </TouchableOpacity>

                {/* Navigation Link */}
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#333",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ff9900",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingRight: 10,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    roleLabel: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5,
        color: "#333",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ff9900",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 2,
    },
    picker: {
        height: 50,
        width: "100%",
    },
    button: {
        backgroundColor: "#ff9900",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
        elevation: 2,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        color: "#007bff",
        textAlign: "center",
        fontSize: 14,
    },
});
