import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../db/firebase'
import { useTheme, TextInput } from 'react-native-paper'
import { BackButton } from '../components/Controls'
import InteractionButton from '../components/InteractionButton'
import { EnvelopeIcon } from 'react-native-heroicons/outline'
import Background from '../components/Background'

const Login = () => {
  
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const navigation = useNavigation()
  const theme = useTheme()

  const onLoginPressed = () => {
    auth.signInWithEmailAndPassword(email.value, password.value).catch((error) => alert(error.message))
  }

  return (
    <Background>
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '90%',
        }}>
          <BackButton />
        <StatusBar style="auto" />
        <View style={styles.titleContainer}>
          <Text style={{...styles.title, color:theme.colors.secondary}}>Iniciar Sesión</Text>
          <Text style={{...styles.subtitle, color:theme.colors.secondary}}>Ingresa tus datos para iniciar sesión</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            placeholder="Ingresa Tu Email" 
            style={{fontFamily:theme.fonts.regular, fontSize: 20}}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            placeholder="****************"
            secureTextEntry={true}
            style={{fontFamily:theme.fonts.regular, fontSize: 20}} 
          />
        </View>
        
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color:theme.colors.accent}}>¿Olvidaste la contraseña?</Text>
          </TouchableOpacity>
        </View>

        <InteractionButton text="Iniciar Sesión" onPress={onLoginPressed} />

        <InteractionButton text="Crear Cuenta" onPress={() => navigation.navigate('ChooseSchool')} background={theme.colors.primary} color={theme.colors.accent} />

      </KeyboardAvoidingView>
      
    </SafeAreaView>
    </Background>
  )
}

export default Login

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    padding: 10,
    margin: 15,
  },
  title: {
    fontSize: 36,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.5,
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
  forgotPasswordContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 15,
    marginRight: 20,
  },
})

