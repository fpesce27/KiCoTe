import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InteractionButton from '../components/InteractionButton'
import { BackButton } from '../components/Controls'
import { TextInput, useTheme } from 'react-native-paper'
import { ManageAmount } from '../Buyers/home/ItemScreen'
import { nameValidator } from './validators/username'
import {db} from '../../db/firebase'
import { useNavigation } from '@react-navigation/native'
import Background from '../components/Background'
import InstitutionInputs from '../components/InstitutionInputs'

const AddSchool = () => {
  
  const [schoolName, setSchoolName] = React.useState('')
  const [schoolLocation, setSchoolLocation] = React.useState('')
  const [schoolDirection, setSchoolDirection] = React.useState('')
  const [schoolKiosks, setSchoolKiosks] = React.useState(1)
  const [breaks, setBreaks] = React.useState([])
  const navigation = useNavigation()
  const theme = useTheme()

  const addSchool = () => {
    const nameError = nameValidator(schoolName)
    const locationError = nameValidator(schoolLocation)
    const directionError = nameValidator(schoolDirection)
    
    if (nameError || locationError || directionError) {
      alert('Error')
      return
    }

    db.collection('schools').add({
      name: schoolName,
      location: schoolLocation,
      direction: schoolDirection,
      kiosks: schoolKiosks,
      breaks: breaks
    }).then((docRef) => {
      navigation.navigate('StartingPage', {schoolId: docRef.id})
    }).catch((error) => {
      alert(error.message)
    })
  }
  
  return (
    <Background>
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{display:'flex', justifyContent:'center', height:'95%'}}>
        <View style={{flex:1, marginTop:10}}><BackButton /></View>

        <View style={{flex:8}}>
          <InstitutionInputs schoolName={schoolName} setSchoolName={setSchoolName} schoolLocation={schoolLocation} setSchoolLocation={setSchoolLocation} schoolDirection={schoolDirection} setSchoolDirection={setSchoolDirection} schoolKiosks={schoolKiosks} setSchoolKiosks={setSchoolKiosks} breaks={breaks} setBreaks={setBreaks} onPress={addSchool} />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
    </Background>
  )
}

export default AddSchool
