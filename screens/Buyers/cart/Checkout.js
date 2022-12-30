import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../../db/firebase'
import { URL , ACCESS_TOKEN} from '@env'

const Checkout = ({route}) => {
    
    console.log(URL)

    const { items } = route.params
    const api = URL + ACCESS_TOKEN
    const [url, setUrl] = React.useState('')

    React.useEffect(() => {
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items.map(item => {
                    return {
                        title: item.cartItem.title,
                        quantity: item.cartItem.amount,
                        unit_price: item.cartItem.price,
                        currency_id: 'ARS',
                    }
                }),
                payer: {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUrl(data.init_point)
            })
    }, [])

    return (
        <>
            <StatusBar style="auto" hidden={true} />
            <WebView 
                source={{ uri: url }} 
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                style={{ marginTop :20 }}

            />
        </>
    )
}

export default Checkout

const styles = StyleSheet.create({})