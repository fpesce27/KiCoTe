import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { auth } from '../../../../db/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../../../components/Controls'
import { Input } from '@rneui/base'
import { useHeaderHeight } from '@react-navigation/elements'
import { nameValidator } from '../../../auth/validators/username'
import InteractionButton from '../../../components/InteractionButton'
import Background from '../../../components/Background'
import { useTheme } from 'react-native-paper'

const ProfileScreen = () => {

  const [image, setImage] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [confirmPassword, setConfirmPassword] = React.useState(null)
  const [selectChangeUsername, setSelectChangeUsername] = React.useState(false)
  const [selectChangePassword, setSelectChangePassword] = React.useState(false)
  const theme = useTheme()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      auth.currentUser.updateProfile({
        photoURL: result.assets[0].uri
      })
    }
  }

  const updateUsername = () => {
    const usernameError = nameValidator(username)
    if (usernameError) {
      alert(usernameError)
      return
    }
    auth.currentUser.updateProfile({
      displayName: username
    }).then(() => {
      alert('Username updated')
      setSelectChangeUsername(false)
    })

  }

  const updatePassword = () => {
    if (password === confirmPassword) {
      auth.currentUser.updatePassword(password)
        .then(() => {
          alert('Password updated')
          setSelectChangePassword(false)
        })
    } else {
      alert('Passwords do not match')
    }
  }

  return (
    <Background>
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <BackButton />
        <View style={styles.container}>

          <Image source={{ uri: image || auth.currentUser.photoURL }} style={styles.profileImage} />

          <Text style={{...styles.name, color:theme.colors.secondary}}>{auth.currentUser.displayName}</Text>
          <Text style={{...styles.email, color:theme.colors.secondary}}>{auth.currentUser.email}</Text>

          <View style={{ width:'100%', margin:15 }} >

            <InteractionButton text="Cambiar Foto De Perfil" onPress={pickImage} />

            <InteractionButton text="Cambiar Nombre De Usuario" onPress={() => {
              setSelectChangeUsername(!selectChangeUsername)
              setSelectChangePassword(false)
            }} />
              
            <InteractionButton text="Cambiar Contraseña" onPress={() => {
              setSelectChangePassword(!selectChangePassword)
              setSelectChangeUsername(false)
            }} />

          </View>

          <View style={{width:'100%'}}>

            {selectChangeUsername ? (
              <>
                <Input
                  placeholder="Nombre De Usuario"
                  onChangeText={setUsername}
                  value={username}
                  label="Nombre De Usuario"
                  labelStyle={{ color: theme.colors.secondary }}
                  style={styles.input}
                  inputContainerStyle={{borderBottomColor: theme.colors.secondary}}
                  placeholderTextColor={theme.colors.secondary}
                  cursorColor={theme.colors.secondary}
                  selectionColor={theme.colors.secondary}
                  inputStyle={{color: theme.colors.secondary}}
                />

                <InteractionButton text="Actualizar Nombre De Usuario" onPress={updateUsername} />
              </>
            ) : null}

            {selectChangePassword ? (
              <>
                <Input
                  placeholder='Contraseña'
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                  label="Contraseña"
                  labelStyle={{ color: theme.colors.secondary }}
                  style={styles.input}
                  inputContainerStyle={{borderBottomColor: theme.colors.secondary}}
                  placeholderTextColor={theme.colors.secondary}
                  cursorColor={theme.colors.secondary}
                  selectionColor={theme.colors.secondary}
                  inputStyle={{color: theme.colors.secondary}}
                />

                <Input
                  placeholder='Confirmar Contraseña'
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry
                  label="Confirmar Contraseña"
                  labelStyle={{ color: theme.colors.secondary }}
                  style={styles.input}
                  inputContainerStyle={{borderBottomColor: theme.colors.secondary}}
                  placeholderTextColor={theme.colors.secondary}
                  cursorColor={theme.colors.secondary}
                  selectionColor={theme.colors.secondary}
                  inputStyle={{color: theme.colors.secondary}}
                />

                <InteractionButton text="Actualizar Contraseña" onPress={updatePassword} />
              </>
            ) : null}

          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </Background>
  )
}


export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? -80 : -120,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginLeft: 15,
  },
})