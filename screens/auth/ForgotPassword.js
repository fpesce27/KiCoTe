import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../db/firebase'
import { BackButton } from '../components/Controls'


const ForgotPassword = () => {
  
    const [email, setEmail] = useState({ value: '', error: '' })
    const navigation = useNavigation()

    const forgotPassword = () => {
        auth.sendPasswordResetEmail(email.value).then(() => {
            alert('Password reset email sent!')
            navigation.navigate('Login')
        })
        .catch((error) => alert(error.message))

    }

    return (
    <SafeAreaView>
        <View style={styles.backBtn}><BackButton /></View>
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '95%',
            }}>
            <StatusBar style="auto" />
            <View style={styles.title}>
                <Text style={styles.titleText}>Forgot Password</Text>
                <Text style={styles.subtitle}>Please Enter Your Email.</Text>
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
                <Text style={styles.forgotPasswordText}>You will receive email with password reset link.</Text>
            </View>

            <View style={styles.forgotPassword}>
                <TouchableOpacity style={styles.button} onPress={forgotPassword}>
                    <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    backBtn: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        margin: 15,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#000',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        marginLeft: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        width: '95%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    forgotPassword: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#000',
        fontSize: 15,
        marginLeft: 12,
    },
})
