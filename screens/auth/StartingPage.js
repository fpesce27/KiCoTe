import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../db/firebase'

const StartingPage = (props) => {

    const [role, setRole] = React.useState('')

    const navigation = useNavigation()
    
    const handleRole = (role) => {
        db.collection(role).doc(auth.currentUser.uid).set({
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            password: props.route.params.password,
            createdAt: new Date().getTime(),
            uid: auth.currentUser.uid,
            role: role,
        })
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '95%',
            }}
        >
            <View style={styles.title}>
                <Text style={styles.titleText}>Let's Get Started</Text>
                <Text style={styles.subtitle}>What Are You Going To Do In The App?</Text>
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleRole('Buyers')}>
                    <Text style={styles.buttonText}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleRole('Sellers')}>
                    <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default StartingPage

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10,
        margin: 15,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#9E9E9E',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 0,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        margin: 15,
        width: '90%',
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})