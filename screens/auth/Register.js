import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { db, auth, firestore } from '../../db/firebase'

const Register = () => {

    const [username, setUsername] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const navigation = useNavigation()

    const onSignUpPressed = () => {
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: username.value,
                    photoUrl: require('../../assets/icon.png')
                })
                navigation.navigate('StartingPage', { password: password.value } )
            })
            .catch((error) => alert(error.message))
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
                    <Text style={styles.titleText}>Create Account</Text>
                    <Text style={styles.subtitle}>Let's Create Account Together</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Enter Your Username"
                        style={styles.input}
                        label="Username"
                        labelStyle={{ color: '#000' }}
                        returnKeyType="next"
                        value={username.value}
                        onChangeText={(text) => setUsername({ value: text, error: '' })}
                        error={!!username.error}
                        errorText={username.error}
                    />
                    <Input
                        placeholder="Enter Your Email"
                        style={styles.input}
                        label="Email"
                        labelStyle={{ color: '#000' }}
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="Enter Your Password"
                        style={styles.input}
                        label="Password"
                        labelStyle={{ color: '#000' }}
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={onSignUpPressed}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.signin}>
                    <Text style={{ color: '#9E9E9E' }}>Alreay Have An Account?</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.signinText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

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
    registerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        margin: 15,
        borderRadius: 15,
        height: 60,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        marginTop: 0,
    },
    signinText: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5,
    },
})