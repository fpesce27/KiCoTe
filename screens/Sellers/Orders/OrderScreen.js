import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemCard from './ItemCard'
import { BackButton } from '../../components/Controls'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheetCancel from './BottomSheetCancel'
import BottomSheetConfirm from './BottomSheetConfirm'

const OrderScreen = ({ route }) => {

    const { userId, name, order, orderId } = route.params
    const bottomSheetConfirm = React.useRef(null);
    const bottomSheetCancel = React.useRef(null);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>

                    <BackButton />
                <View style={styles.dataContainer}>
                    <View style={{marginTop:-140}}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Orden de {name}</Text>
                        </View>

                        <FlatList
                            data={order.items}
                            renderItem={({ item }) => (
                                <ItemCard item={item} />
                            )}
                            keyExtractor={item => item.id}
                            style={{ padding: 20, height:'50%' }}
                        />
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.summaryContainer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.summaryText}>Total</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.summaryText}>{order.total}</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => bottomSheetCancel.current?.present()}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: '#007AFF' }} onPress={() => bottomSheetConfirm.current?.present()}>
                            <Text style={styles.buttonText}>Completado</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomSheetCancel order={order} userId={userId} bottomSheetCancel={bottomSheetCancel} orderId={orderId}/>
                <BottomSheetConfirm order={order} userId={userId} bottomSheetConfirm={bottomSheetConfirm} orderId={orderId}/>

            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: -50,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    items: {
        padding: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#FF0000',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        width: '40%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    summaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 15,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    totalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})