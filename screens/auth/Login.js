import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../db/firebase'

const Login = () => {
  
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const navigation = useNavigation()

  const onLoginPressed = () => {
    auth.signInWithEmailAndPassword(email.value, password.value).catch((error) => alert(error.message))
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '95%',
        }}>
        <StatusBar style="auto" />
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Welcome Back! Please Enter Your Details.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter Your Email"
            style={styles.input}
            label="Email"
            labelStyle={{color:'#000'}}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Input
            placeholder="*************"
            style={styles.input}
            label="Password"
            labelStyle={{color:'#000'}}
            secureTextEntry
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
          />
        </View>

        <View style={styles.forgotPassword}>
          <TouchableOpacity>
            <Text style={{fontWeight:'400'}} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onLoginPressed}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signup}>
          <Text style={{color:'#9E9E9E'}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={styles.signupText}>Sign Up For Free</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

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
  input: {
    width: '100%',
    marginBottom: 10,
    marginLeft: 12,
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 15,
    marginTop: 0,
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 15,
    borderRadius: 15,
    height: 60,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginTop: 0,
  },
  signupText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
  },
})