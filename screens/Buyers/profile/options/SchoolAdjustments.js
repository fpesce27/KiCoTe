import { FlatList, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackButton } from '../../../components/Controls'
import { List, TextInput, useTheme } from 'react-native-paper'
import { db } from '../../../../db/firebase'
import DateTimePicker from '@react-native-community/datetimepicker';
import InteractionButton from '../../../components/InteractionButton'
import { Dialog } from '@rneui/base'
import InstitutionInputs from '../../../components/InstitutionInputs'
import Background from '../../../components/Background'
import { useNavigation } from '@react-navigation/native'

const SchoolAdjustments = () => {

    const [breaks, setBreaks] = React.useState([])
    const theme = useTheme()
    const navigation = useNavigation()
    const [visible, setVisible] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [id, setId] = React.useState('')
    const [breakName, setBreakName] = React.useState('')
    const [breakStart, setBreakStart] = React.useState(new Date())
    const [breakEnd, setBreakEnd] = React.useState(new Date())
    const [schoolName, setSchoolName] = React.useState('')
    const [schoolLocation, setSchoolLocation] = React.useState('')
    const [schoolDirection, setSchoolDirection] = React.useState('')
    const [schoolKiosks, setSchoolKiosks] = React.useState(1)

    React.useEffect(() => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Breaks').onSnapshot((querySnapshot) => {
            setBreaks(querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    break: doc.data()
                }
            }))
        })
        db.collection('Schools').doc(theme.data.schoolId).onSnapshot((doc) => {
            setSchoolName(doc.data().name)
            setSchoolLocation(doc.data().location)
            setSchoolDirection(doc.data().direction)
            setSchoolKiosks(doc.data().kiosks)
        })
            
    }, [])

    const deleteBreak = (item) => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Breaks').doc(item.id).delete()
    }

    const addItem = () => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Breaks').add({
            name: breakName,
            start: breakStart,
            end: breakEnd
        })
    }

    const editItem = () => {
        db.collection('Schools').doc(theme.data.schoolId).collection('Breaks').doc(id).update({
            name: breakName,
            start: breakStart,
            end: breakEnd
        })
    }

    const handleEdit = (item) => {
        setShowEdit(true)
        setVisible(true)
        setBreakName(item.break.name)
        setBreakStart(item.break.start.toDate())
        setBreakEnd(item.break.end.toDate())
        setId(item.id)
    }

    const editSchool = () => {
        db.collection('Schools').doc(theme.data.schoolId).update({
            name: schoolName,
            location: schoolLocation,
            direction: schoolDirection,
            kiosks: schoolKiosks
        })
        navigation.goBack()
    }

    return (
        <Background >
            <SafeAreaView>
                <KeyboardAvoidingView behavior='position'>
                    <BackButton />

                    <View style={styles.inputContainer}>

                        <List.Accordion
                            title='Recreos'
                            titleStyle={{ color: theme.colors.primary }}
                            style={{ borderRadius: 24, backgroundColor: theme.colors.secondary }}
                            left={props => <List.Icon {...props} icon="clock" color={theme.colors.primary} />}
                            right={props => <List.Icon {...props} icon="chevron-down" color={theme.colors.primary} />}
                        >
                            <FlatList
                                data={breaks}
                                renderItem={({ item }) =>
                                    <List.Item
                                        title={item.break.name}
                                        titleStyle={{ color: theme.colors.secondary }}
                                        right={props => (
                                            <TouchableOpacity onPress={() => deleteBreak(item)}>
                                                <List.Icon {...props} icon="delete" color={theme.colors.secondary} />
                                            </TouchableOpacity>
                                        )}
                                        left={props => (
                                            <TouchableOpacity onPress={() => handleEdit((item))}>
                                                <List.Icon {...props} icon="pencil" color={theme.colors.secondary} />
                                            </TouchableOpacity>
                                        )}
                                        style={{ marginLeft: -64 }}
                                    />
                                }
                            />

                            <TouchableOpacity onPress={addItem} style={{ marginLeft:-64 }}>
                                <List.Item
                                    title='Agregar'
                                    titleStyle={{ color: theme.colors.primary }}
                                    style={{ backgroundColor: theme.colors.accent, borderBottomEndRadius: 24, borderBottomStartRadius: 24 }}
                                    left={props => <List.Icon {...props} icon="plus" color={theme.colors.primary} />}
                                    onPress={() => setVisible(true)}
                                /> 
                            </TouchableOpacity>

                        </List.Accordion>

                    </View>

                    <Dialog visible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={ {backgroundColor:theme.colors.primary, borderRadius:24} }>
                        
                        <Dialog.Title title={showEdit ? "Editar Recreo" : "Agregar Recreo"} titleStyle={{ color: theme.colors.secondary }} />
                        
                        <TextInput
                            placeholder='Nombre'
                            placeholderTextColor={theme.colors.secondary}
                            underlineColor={theme.colors.secondary}
                            selectionColor={theme.colors.secondary}
                            textColor={theme.colors.accent}
                            value={breakName}
                            onChangeText={setBreakName}
                        />
                        <View style={{padding:10}}>
                            <Text style={{color: theme.colors.secondary}}>Hora de inicio</Text>
                            <DateTimePicker
                                value={breakStart}
                                mode='time'
                                display='spinner'
                                onChange={
                                    (event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setBreakStart(currentDate)
                                    }
                                }
                                style={{height:100}}
                                textColor={theme.colors.accent}
                            />
                        </View>
                    
                        <View style={{padding:10}}>
                            <Text style={{color: theme.colors.secondary}}>Hora de Finalización</Text>
                            <DateTimePicker
                                value={breakEnd}
                                mode='time'
                                display='spinner'
                                onChange={
                                    (event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setBreakEnd(currentDate)
                                    }
                                }
                                style={{height:100}}
                                textColor={theme.colors.accent}
                            />
                        </View>
                        
                        <Dialog.Actions>
                            <InteractionButton
                                text={showEdit ? "Editar" : "Agregar"}
                                onPress={
                                    () => {
                                        setVisible(false)
                                        if (showEdit) {
                                            editItem()
                                            setShowEdit(false)
                                        } else {
                                            addItem()
                                        }
                                    }
                                }
                            />
                        </Dialog.Actions>

                    </Dialog>

                    <InstitutionInputs edition schoolName={schoolName} setSchoolName={setSchoolName} schoolLocation={schoolLocation} setSchoolLocation={setSchoolLocation} schoolDirection={schoolDirection} setSchoolDirection={setSchoolDirection} schoolKiosks={schoolKiosks} setSchoolKiosks={setSchoolKiosks} onPress={editSchool} />
                        
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Background>
    )
}

export default SchoolAdjustments

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        borderRadius: 24,
        margin: 15,
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#fff',
    },
})