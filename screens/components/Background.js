import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Background = (props) => {
  return (
    <ImageBackground source={require('../../assets/background.png')} style={{height:'100%'}}>
      {props.children}
    </ImageBackground>
  )
}

export default Background