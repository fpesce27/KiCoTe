import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../db/firebase'
import InteractionButton from '../components/InteractionButton'
import { useTheme } from 'react-native-paper'
import { BackButton } from '../components/Controls'

const StartingPage = (props) => {

    const navigation = useNavigation()
    const theme = useTheme()
    
    const handleRole = (role) => {
        navigation.navigate('Register', { role: role })
    }

    return (
        <SafeAreaView
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '95%',
            }}
        >   
            <View style={{flex:1}}><BackButton /></View>
            <View style={{flex:3}}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Vamos a Comenzar</Text>
                    <Text style={styles.subtitle}>¿Qué vas a hacer en la app?</Text>
                </View>

                <InteractionButton text="Comprar" background={theme.colors.primary} color="#fff" onPress={() => handleRole('Buyers')} />
                <InteractionButton text="Vender" background="#fff" color={theme.colors.primary} onPress={() => handleRole('Sellers')} /> 
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
        opacity: 0.5,
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