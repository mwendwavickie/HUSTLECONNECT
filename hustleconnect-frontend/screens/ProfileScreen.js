import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { user, logout, login } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => logout() }
        ]);
    };

    const handleSave = () => {
        login(editedUser);
        setIsEditing(false);
        Alert.alert("Profile Updated", "Your profile has been updated successfully.");
    };

    if (!user) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.message}>You are not logged in</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>My Profile</Text>

            <View style={styles.profileSection}>
                <Image
                    source={{ uri: editedUser.profilePicture || 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>{user.name}</Text>
            </View>

            <View style={styles.infoSection}>
                {renderField("Name", editedUser.name, (text) => setEditedUser({ ...editedUser, name: text }), isEditing)}
                {renderField("Email", editedUser.email, (text) => setEditedUser({ ...editedUser, email: text }), isEditing)}
                {renderField("Phone", editedUser.phone, (text) => setEditedUser({ ...editedUser, phone: text }), isEditing, "phone-pad")}
                {renderField("Gender", editedUser.gender || "", (text) => setEditedUser({ ...editedUser, gender: text }), isEditing)}
                <Text style={styles.staticField}>Role: <Text style={styles.roleText}>{user.role || "User"}</Text></Text>
            </View>

            <View style={styles.buttonRow}>
                {isEditing ? (
                    <>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Ionicons name="save" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setEditedUser(user);
                                setIsEditing(false);
                            }}
                        >
                            <Ionicons name="close-outline" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Ionicons name="create-outline" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const renderField = (label, value, onChange, editable, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, !editable && styles.readOnly]}
            value={value}
            onChangeText={onChange}
            editable={editable}
            keyboardType={keyboardType}
            placeholder={editable ? `Enter your ${label.toLowerCase()}` : ""}
        />
    </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f4f8',
        alignItems: 'center',
        marginTop: 30,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    message: {
        fontSize: 18,
        color: '#555',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#ff9900',
        borderWidth: 2,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    username: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    infoSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    readOnly: {
        backgroundColor: '#eee',
        color: '#666',
    },
    staticField: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
    },
    roleText: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff9900',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});
