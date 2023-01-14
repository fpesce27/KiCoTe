import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../db/firebase'
import InteractionButton from '../components/InteractionButton'
import { useTheme } from 'react-native-paper'
import { BackButton } from '../components/Controls'
import Background from '../components/Background'

const StartingPage = ({route}) => {

    const navigation = useNavigation()
    const theme = useTheme()
    
    const handleRole = (role) => {
        navigation.navigate('Register', { role: role, schoolId: route.params.schoolId })
    }

    return (
        <Background>
        <SafeAreaView
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '95%',
            }}
        >   
            <View style={{flex:1}}><BackButton /></View>
            <View style={{flex:2}}>
                <View style={styles.title}>
                    <Text style={{...styles.titleText, color:theme.colors.secondary}}>Vamos a Comenzar</Text>
                    <Text style={{...styles.subtitle, color:theme.colors.secondary}}>¿Qué vas a hacer en la app?</Text>
                </View>

                <InteractionButton text="Comprar" onPress={() => handleRole('buyers')} />
                <InteractionButton text="Vender" background={theme.colors.primary} color={theme.colors.accent} onPress={() => handleRole('sellers')} /> 
            </View>
        </SafeAreaView>
        </Background>
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