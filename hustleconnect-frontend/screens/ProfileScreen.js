import react, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { TextInput } from 'react-native-gesture-handler';



const ProfileScreen = ()=> {
    const { user, logout, login} = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({...user});

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => logout() }
            ]
        );
    };

    const handleSave = () => {
        login(editedUser); // Update user in context
        setIsEditing(false); // Exit edit mode
        Alert.alert("Profile Updated", "Your profile has been updated successfully.");

    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You are not logged in</Text>
            </View>
        )
    };

    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: editedUser.profilePicture || 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.label}>Name </Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.readOnly]}
                    value ={editedUser.name}
                    editable={isEditing}
                    onChangeText={(text) => setEditedUser({...editedUser, name: text})}
                />
                <Text style={styles.label}>Email </Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.readOnly]}
                    value={editedUser.email}
                    editable={isEditing}
                    onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                />
                <Text style={styles.phone}>Phone </Text>
                <TextInput
                    style={[styles.input, !isEditing && styles.readOnly]}
                    value={editedUser.phone}
                    keyboardType='phone-pad'
                    editable={isEditing}
                    onChangeText={(text) => setEditedUser({...editedUser, phone: text})}
                />
                <Text style={styles.label}>Gender  </Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.readOnly]}
                    value={editedUser.gender || ""}
                    editable={isEditing}
                    placeholder="Male, Female, Other"
                    onChangeText={(text) => setEditedUser({ ...editedUser, gender: text })}
                />
                <Text style={styles.label}>Role: {user.role || "User"} </Text>
                
            </View> 

            <View style={styles.buttonRow}>
                {isEditing ? (
                    <>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Ionicons name="save" size={20} color="#fff" />
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                     style={styles.cancelButton} 
                     onPress= {() => {
                        setEditedUser(user); 
                        setIsEditing(false);
                    }}
                    >
                        <Ionicons name="close-outline" size={20} color="#fff" />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Ionicons name="create-outline" size={20} color="#fff" />
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                )}

            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out" size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoSection: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        color: '#333',
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
        backgroundColor: '#f2f2f2',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    editText: {
        color: '#fff',
        marginLeft: 10,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    saveText: {
        color: '#fff',
        marginLeft: 10,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelText: {
        color: '#fff',
        marginLeft: 10,
    },
    phone: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff9900',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        marginLeft: 10,
    },
    message: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginTop: 50,
    }
})