import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ItemCard from './ItemCard'
import { ScrollView } from 'react-native'
import { BackButton } from '../../components/Controls'
import { db } from '../../../db/firebase' 
import BottomSheet from '@gorhom/bottom-sheet';
import { Modal } from 'react-native-paper'

const OrderScreen = ({ route }) => {
    
    const { userId, name, order } = route.params
    const [cancelled, setCancelled] = React.useState(false)

    const bottomSheetRef = React.useRef(null);

    const handleCompleted = () => {
        db.collection('Buyers').doc(userId).collection('orders').doc(order.id).update({
            status: 'completed'
        })
    }

    const handleCancel = () => {
        /* db.collection('Buyers').doc(userId).collection('orders').doc(order.id).update({
            status: 'cancelled'
        }) */
        setCancelled(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dataContainer}>
                <BackButton />
                <View style={{marginTop:-50}}>
                    <View style={styles.title}>
                        <Text style={styles.text}>Orden de {/* {name} */} Fpesce27</Text>
                    </View>

                    <ScrollView style={{ height: '50%' }}>
                        <View style={styles.items}>
                            {order.items.map((item, index) => (
                                <ItemCard key={index} item={item} />
                            ))}
                        </View>
                    </ScrollView>
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
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#007AFF' }} onPress={handleCompleted}>
                        <Text style={styles.buttonText}>Completado</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={cancelled} onDismiss={() => setCancelled(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>¿Estás seguro de que quieres cancelar la orden?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setCancelled(false)}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.modalButton, backgroundColor: '#007AFF' }} onPress={handleCancel}>
                                <Text style={styles.modalButtonText}>Sí</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
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