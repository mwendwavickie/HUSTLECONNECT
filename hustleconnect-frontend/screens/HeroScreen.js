import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Image} from "react-native";


const HeroScreen = ({ navigation }) => {
    
    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.link}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    //source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Welcome To HustleConnect</Text>
                <Text style={styles.subtitle}>Find and Book your trusted local services</Text>
            

                <TouchableOpacity
                    style={styles.exploreButton}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.exploreButtonText}>Explore Services</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        );
}
export default HeroScreen;

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: 'blue',
    },

    container: {
        flex:1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 50,
    },
    link: {
        marginLeft: 20,
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    logo: {
        width: 150,
        height: 80
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -80,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color:'#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize:16,
        color: '#555',
        marginBottom: 30,
        textAlign:'center',
    },
    exploreButton: {
        backgroundColor: '#ff9900', // Orange background
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: 'center',
    },
    exploreButtonText: {
        color: 'black', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
})