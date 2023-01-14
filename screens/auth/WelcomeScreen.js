import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import InteractionButton from '../components/InteractionButton'
import { useNavigation } from '@react-navigation/native'
import Background from '../components/Background'
import * as Location from 'expo-location';

const WelcomeScreen = () => {

    const theme = useTheme()
    const navigation = useNavigation()

    React.useEffect(() => {
        Location.requestForegroundPermissionsAsync();
    })

    return (
        <Background>
            <SafeAreaView style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }
            }>
                <View style={styles.logoAndTitle}>
                    <View style={{width: 200, height: 200}}>
                        <Image source={require('../../assets/logo.png')} style={{width: '100%', height: '100%', borderRadius:100}} />
                    </View>
                    <Text style={{...styles.title, fontFamily:theme.fonts.welcomeScreen, color:theme.colors.accent2}}>Kicote</Text>
                    <Text style={{...styles.subtitle, fontFamily:theme.fonts.welcomeScreen}}>El Kiosco de tu Colegio, en tu Telefono</Text>
                </View>

                <InteractionButton text="Empieza aqui" onPress={() => navigation.navigate('Login')} />
            </SafeAreaView>
        </Background>
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