import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import InteractionButton from '../components/InteractionButton'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {

    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <SafeAreaView style={
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%',
            }
        }>
            <View style={styles.logoAndTitle}>
                <Image source={require('../../assets/icon.png')} style={styles.logo} />
                <Text style={{...styles.title, fontFamily:theme.fonts.welcomeScreen, color:theme.colors.primary}}>Kicote</Text>
                <Text style={{...styles.subtitle, fontFamily:theme.fonts.welcomeScreen}}>El Kiosco de tu Colegio, en tu Telefono</Text>
            </View>

            <InteractionButton text="Empieza aqui" background={theme.colors.primary} color="#fff" onPress={() => navigation.navigate('Login')} />
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    logoAndTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 48,
        lineHeight: 58,
    },
    subtitle: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 22,
      },
})