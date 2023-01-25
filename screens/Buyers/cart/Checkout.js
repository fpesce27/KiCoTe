import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../../db/firebase'
import Background from '../../components/Background'
import { ACCESS_TOKEN, API } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview';
import BackButton from '../../components/Controls'

const Checkout = ({ route }) => {

    const { items } = route.params;



    return (
        <>
        <BackButton />
            <WebView
                source={{ uri: 'https://www.google.com' }}
                style={{ margin:40, marginTop:100 }}
            />
        </>
    )
}

export default Checkout

const styles = StyleSheet.create({})