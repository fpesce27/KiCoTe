import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { db, auth, firestore } from '../../db/firebase'
import { useTheme, TextInput } from 'react-native-paper'
import { BackButton } from '../components/Controls'
import InteractionButton from '../components/InteractionButton'
import Background from '../components/Background'

const Register = ({ route }) => {

    const [username, setUsername] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const theme = useTheme()
    const schoolId = route.params.schoolId
    const role = route.params.role

    const onSignUpPressed = () => {
        if (password.value !== confirmPassword.value){
            return alert("Las contraseñas no coinciden")
        }
        else{
            
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: username.value,
                        photoUrl: require('../../assets/icon.png'),
                    })
                    
                    const userRef = db.collection('users').doc(authUser.user.uid);
                    const schoolRef = db.collection('schools').doc(schoolId);

                    if(role === "sellers"){
                        schoolRef.collection("sellers").doc(authUser.user.uid).set({
                            userId: authUser.user.uid,
                            role: role,
                        });
                    }else{
                        schoolRef.collection("buyers").doc(authUser.user.uid).set({
                            userId: authUser.user.uid,
                            role: role,
                        });
                    }

                    userRef.set({
                        name:username.value,
                        email:email.value,
                        image: require('../../assets/icon.png'),
                        schoolId: schoolId,
                        role: role
                    });

                })
                .catch((error) => console.log(error.message))
        }
    }

    return (
        <Background>
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
                    <Text style={{ ...styles.title, color:theme.colors.secondary }}>Crea Tu Cuenta</Text>
                    <Text style={{ ...styles.subtitle, color:theme.colors.secondary }}>Ingresa tus datos para crear tu cuenta</Text>
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
                    <Text style={{ color:theme.colors.secondary, fontSize: 14 }}>Al registrarte, aceptas nuestros</Text>
                    <TouchableOpacity>
                        <Text style={{ color:theme.colors.secondary, fontSize: 14, color: theme.colors.accent }}> Términos y condiciones</Text>
                    </TouchableOpacity>
                </View>

                <InteractionButton onPress={onSignUpPressed} text="Crear Cuenta" />

            </KeyboardAvoidingView>
        </SafeAreaView>
        </Background>
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
