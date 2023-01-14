import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../components/Controls'
import { useTheme, TextInput } from 'react-native-paper'
import {db} from '../../db/firebase'
import { useNavigation } from '@react-navigation/native'
import Background from '../components/Background'

const ChooseSchool = () => {
    
    const theme = useTheme()
    const [school, setSchool] = React.useState('')
    const navigation = useNavigation()
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        if (school.length > 0) {
            db.collection('schools').where('name', '>=', school).where('name', '<=', school + '\uf8ff').get()
            .then((querySnapshot) => {
                const schools = []
                querySnapshot.forEach((doc) => {
                    schools.push({...doc.data(), id:doc.id})
                })
                setSuggestions(schools)
            })

            if (suggestions.length === 0){
                db.collection('schools').doc(school).get()
                .then((doc) => {
                    if (doc.exists){
                        setSuggestions([doc.data()])
                    }
                })
            }
        }
        else {
            setSuggestions([])
        }
    }, [school])

    return (
        <Background>
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior="padding"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                }}>
                    
                <View style={{ flex: 1 }}><BackButton /></View>

                <View style={{ flex: 2 }}>

                    <View style={styles.title}>
                        <Text style={{...styles.titleText, color:theme.colors.secondary}}>Selecciona Tu Institución</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Ingresa el nombre o el codigo"
                            style={{ fontSize: 20, width: '100%' }}
                            value={school}
                            onChangeText={text => setSchool(text)}
                        />
                        {suggestions.length > 0 &&
                        <FlatList
                            data={suggestions}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => navigation.navigate('StartingPage', {schoolId:item.id})} style={styles.schoolContainer}>
                                    <Text style={{...styles.addSchoolText, padding:10}}>{item.name}</Text>
                                    <View style={{display:'flex', flexDirection:'row', marginRight:10}}>
                                        <Text style={styles.schoolData}>{item.direction}, </Text>
                                        <Text style={styles.schoolData}>{item.location}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        }
                    </View>

                    <View style={styles.addSchool}>

                        <Text style={styles.subtitle}>No encuentras tu institución?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddSchool')}>
                            <Text style={{...styles.addSchoolText, color:theme.colors.accent}}>Agregala</Text>
                        </TouchableOpacity>
                        
                    </View>
                    

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </Background>
    )
}

export default ChooseSchool

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
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
    subtitle: {
        fontSize: 15,
        fontWeight: 'normal',
        opacity: 0.5,
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addSchoolText: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    schoolContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        padding: 10,
    },
    schoolData: {
        opacity:0.5,

    }
})