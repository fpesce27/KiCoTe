import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme, TextInput, List } from 'react-native-paper'
import { ManageAmount } from '../Buyers/home/ItemScreen'
import InteractionButton from './InteractionButton'
import ManageBreaks from './ManageBreaks'

const InstitutionInputs = (props) => {

    const theme = useTheme()

    return (
        <>
            {!props.edition &&
                <View style={styles.title}>
                    <Text style={{ ...styles.titleText, color: theme.colors.secondary }}>Agrega Tu Institución</Text>
                </View>
            }

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Ingresa El Nombre"
                    style={{ fontSize: 20, width: '100%' }}
                    value={props.schoolName}
                    onChangeText={text => props.setSchoolName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Ingresa La Localidad"
                    style={{ fontSize: 20, width: '100%' }}
                    value={props.schoolLocation}
                    onChangeText={text => props.setSchoolLocation(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Ingresa La Direccion"
                    style={{ fontSize: 20, width: '100%' }}
                    value={props.schoolDirection}
                    onChangeText={text => props.setSchoolDirection(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
                <ManageBreaks breaks={props.breaks} setBreaks={props.setBreaks} />
            </View>
            <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 20, color: theme.colors.secondary }}> ¿Cuantos kioskos hay en la institución?</Text>

            <View style={styles.amountContainer}>
                <ManageAmount amount={props.schoolKiosks} setAmount={props.setSchoolKiosks} />
            </View>

            <InteractionButton text={!props.edition ? 'Agregar' : 'Editar'} onPress={props.onPress} />

        </>
    )
}

export default InstitutionInputs

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
          marginHorizontal: 0,
          alignItems: 'center',
        }
})