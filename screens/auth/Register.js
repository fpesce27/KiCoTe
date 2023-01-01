import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { db, auth, firestore } from '../../db/firebase'
import { useTheme, TextInput } from 'react-native-paper'
import { BackButton } from '../components/Controls'

const Register = ({ route }) => {

    const [username, setUsername] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const role = route.params.role
    const navigation = useNavigation()
    const theme = useTheme()

    const onSignUpPressed = () => {
        if (password.value !== confirmPassword.value){
            return alert("Las contraseñas no coinciden")
        }
        else{
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: username.value,
                        photoUrl: require('../../assets/icon.png')
                    })
                    db.collection('Users').doc(authUser.user.uid).set({
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        photoUrl: require('../../assets/icon.png'),
                        createdAt: new Date(),
                        role: role
                    })
                })
                .catch((error) => alert(error.message))
        }
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
                <BackButton />
                <View style={styles.titleContainer}>
                    <Text style={{ ...styles.title, fontFamily: theme.fonts.regular }}>Crea Tu Cuenta</Text>
                    <Text style={{ ...styles.subtitle, fontFamily: theme.fonts.regular }}>Ingresa tus datos para crear tu cuenta</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nombre de usuario"
                        value={username.value}
                        onChangeText={text => setUsername({ value: text, error: '' })}
                        autoCapitalize="none"
                        style={{ fontFamily: theme.fonts.regular, fontSize: 20 }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        style={{ fontFamily: theme.fonts.regular, fontSize: 20 }}
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        autoCapitalize="none"
                        keyboardType='email-address'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Contraseña'
                        style={{ fontFamily: theme.fonts.regular, fontSize: 20 }}
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Confirmar contraseña'
                        style={{ fontFamily: theme.fonts.regular, fontSize: 20 }}
                        value={confirmPassword.value}
                        onChangeText={text => setConfirmPassword({ value: text, error: '' })}
                        secureTextEntry
                    />
                </View>

                <View style={styles.terms}>
                    <Text style={{ fontFamily: theme.fonts.regular, fontSize: 14 }}>Al registrarte, aceptas nuestros</Text>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: theme.fonts.regular, fontSize: 14, color: theme.colors.primary }}> Términos y condiciones</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.colors.primary }} onPress={onSignUpPressed}>
                        <Text style={{ ...styles.buttonText, fontFamily: theme.fonts.regular }}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

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
    },
    inputContainer: {
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
    terms: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
})

































{/* <View style={styles.title}>
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
}) */}