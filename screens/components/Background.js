import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Background = (props) => {
  return (
    <LinearGradient colors={['#FBAB7E', '#F7CE68']} style={{ flex: 1 }}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
        {props.children}
    </LinearGradient>
  )
}

export default Background

const styles = StyleSheet.create({})