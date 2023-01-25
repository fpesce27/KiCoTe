import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { BlurView } from 'expo-blur';

const Background = (props) => {

  const theme = useTheme()

  return (

    <View style={{ backgroundColor: theme.colors.background, flex:1 }}>
      {props.children}
    </View>

  )
}

export default Background

const styles = StyleSheet.create({
})