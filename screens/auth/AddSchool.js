import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InteractionButton from '../components/InteractionButton'
import { BackButton } from '../components/Controls'
import { TextInput } from 'react-native-paper'
import { ManageAmount } from '../Buyers/home/ItemScreen'
import { nameValidator } from './validators/username'
import {db} from '../../db/firebase'
import { useNavigation } from '@react-navigation/native'

const AddSchool = ({route}) => {
  
  const [schoolName, setSchoolName] = React.useState('')
  const [schoolKiosks, setSchoolKiosks] = React.useState(1)
  const navigation = useNavigation()
  const role = route.params.role

  const addSchool = () => {
    const nameError = nameValidator(schoolName)
    if (nameError) {
      alert(nameError)
      return
    }
    db.collection('Schools').add({
      name: schoolName,
      kiosks: schoolKiosks,
    }).then((data) => {
      navigation.navigate('Register', {school: data.id, role: role})
    })
  }
  
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{display:'flex', justifyContent:'center', height:'95%'}}>
        <View style={{flex:1, marginTop:10}}><BackButton /></View>
        <View style={{flex:3}}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Agrega Tu Institución</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ingresa El Nombre"
              style={{fontSize:20, width:'100%'}}
              value={schoolName}
              onChangeText={text => setSchoolName(text)}
            />            
          </View>
          <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15, marginTop:20}}> ¿Cuantos kioskos hay en la institución?</Text>
          <View style={styles.amountContainer}>
            <ManageAmount amount={schoolKiosks} setAmount={setSchoolKiosks} />
          </View>
          <InteractionButton text="Agregar" onPress={addSchool} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddSchool

const styles = StyleSheet.create({
  title: {
    padding: 10,
    margin: 15,
    display: 'flex',
    alignItems: 'center',
},
titleText: {
    fontSize: 25,
    fontWeight: 'bold',
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
  addSchool: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSchoolText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountContainer: {
    margin: 15,
    alignItems: 'center',
    width: '67%',
  }
})