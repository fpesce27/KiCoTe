import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const InteractionButton = (props) => {
    
    const theme = useTheme()

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: props.background ? props.background : theme.colors.accent }} onPress={props.onPress}>
                <Text style={{ ...styles.buttonText, fontFamily: theme.fonts.regular, color: props.color ? props.color : theme.colors.primary }}>{props.icon}{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InteractionButton

const styles = StyleSheet.create({
    inputContainer:{
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        borderRadius: 24,
        width: '100%',
        padding: 10,
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
      },
})