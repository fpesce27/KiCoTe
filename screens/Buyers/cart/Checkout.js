import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../../db/firebase'
import Background from '../../components/Background'
import { ACCESS_TOKEN, API } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MercadoPago from 'react-native-mercado-pago';

const Checkout = ({ route }) => {

    const { items } = route.params;


    const handleCheckout = async () => {
        try {
            const publicKey = 'TEST-dc0b51e0-0eb7-47ce-b145-5585a0189eb0';
            const preferenceId = '113196323-082708db-09c3-4c7d-a65a-727e237c76e0';
            const result = await MercadoPago.startPayment(publicKey, preferenceId, {
            color: '#6200EE',
            enableBankDeals: true,
            language: 'es',
            });
            if (result.type === 'success') {
            Alert.alert('Success', JSON.stringify(result));
            } else {
            Alert.alert('Canceled', 'Se canceló la transacción');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
}


    return (
        <Background>
            <StatusBar style="auto" hidden={true} />
            <SafeAreaView>
                <View>
                    <Text>Checkout</Text>
                    <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }} onPress={handleCheckout}>
                        <Text>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Background>
    )
}

export default Checkout

const styles = StyleSheet.create({})