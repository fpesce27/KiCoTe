import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { auth } from '../../../../db/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../../../components/Controls'
import { Input } from '@rneui/base'
import { useHeaderHeight } from '@react-navigation/elements'
import { nameValidator } from '../../../auth/validators/username'

const ProfileScreen = () => {

  const [image, setImage] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [confirmPassword, setConfirmPassword] = React.useState(null)
  const [selectChangeUsername, setSelectChangeUsername] = React.useState(false)
  const [selectChangePassword, setSelectChangePassword] = React.useState(false)

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

  const height = useHeaderHeight()

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <View style={styles.backBtn}>
            <BackButton />
          </View>

          <Image source={{ uri: image || auth.currentUser.photoURL }} style={styles.profileImage} />

          <Text style={styles.name}>{auth.currentUser.displayName}</Text>
          <Text style={styles.email}>{auth.currentUser.email}</Text>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            setSelectChangeUsername(!selectChangeUsername)
            setSelectChangePassword(false)
          }}>
            <Text style={styles.buttonText}>Change Username</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            setSelectChangePassword(!selectChangePassword)
            setSelectChangeUsername(false)
          }}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>

            {selectChangeUsername ? (
              <>
                <Input
                  placeholder="Username"
                  onChangeText={setUsername}
                  value={username}
                  label="Username"
                  labelStyle={{ color: 'black' }}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={updateUsername}>
                  <Text style={styles.buttonText}>Update Username</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {selectChangePassword ? (
              <>
                <Input
                  placeholder='Password'
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                  label="Password"
                  labelStyle={{ color: 'black' }}
                  style={styles.input}
                />

                <Input
                  placeholder='Confirm Password'
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry
                  label="Confirm Password"
                  labelStyle={{ color: 'black' }}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={updatePassword}>
                  <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
              </>
            ) : null}

          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


export default ProfileScreen

const styles = StyleSheet.create({
  backBtn: {
    width: '100%',
  },
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  email: {
    fontSize: 16,
    color: 'gray',
    paddingTop: 5,
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
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    marginLeft: 15,
  },
})