import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../db/firebase'
import { BackButton } from '../components/Controls'
import { useTheme, TextInput } from 'react-native-paper'
import InteractionButton from '../components/InteractionButton'
import Background from '../components/Background'


const ForgotPassword = () => {
  
    const [email, setEmail] = useState({ value: '', error: '' })
    const navigation = useNavigation()
    const theme = useTheme()

    const forgotPassword = () => {
        auth.sendPasswordResetEmail(email.value).then(() => {
            alert('Password reset email sent!')
            navigation.navigate('Login')
        })
        .catch((error) => alert(error.message))

    }

    return (
      <Background>
    <SafeAreaView>
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '95%',
            }}>
            <StatusBar style="auto" />
            <BackButton />
            <View>
                <View style={styles.titleContainer}>
                    <Text style={{...styles.title, color:theme.colors.secondary}}>Recuperar Contraseña</Text>
                    <Text style={{...styles.subtitle, color:theme.colors.secondary}}>Ingresa tu email para recuperar tu contraseña</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        placeholder="Ingresa Tu Email"
                        style={{fontFamily:theme.fonts.regular, fontSize: 20}}
                    />
                </View>
            </View>


            <InteractionButton text="Recuperar Contraseña" onPress={forgotPassword} disabled={email.value == ""}/>

        </KeyboardAvoidingView>
    </SafeAreaView>
    </Background>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        padding: 10,
        margin: 15,
      },
      title: {
        fontSize: 33,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
      },
      inputContainer:{
        margin: 15,
        backgroundColor: '#FFFFFF',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        borderRadius: 24,
      },
      button: {
        width: '100%',
        height: 58,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
      },

})
