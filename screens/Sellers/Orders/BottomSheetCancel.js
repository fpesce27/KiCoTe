import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../../db/firebase';
import { useTheme } from 'react-native-paper';

const BottomSheetCancel = (props) => {

    const navigation = useNavigation();
    const bottomSheetCancel = props.bottomSheetCancel;
    const [reason, setReason] = React.useState('')
    const theme = useTheme()

    const confirmCancel = () => {
        if (reason === '') {
            alert('Please enter a reason for cancelling the order')
        } else {
            db.collection('activeOrders').doc(props.orderId).delete();
            db.collection('users').doc(props.order.userId).collection('orders').add({
                items: props.order.items,
                total: props.order.total,
                status: 'Cancelled',
                reason: reason,
                date: new Date(),
                userId: props.order.userId,
                break: props.order.break,
            })
            db.collection('users').doc(auth.currentUser.uid).collection('orders').add({
                items: props.order.items,
                total: props.order.total,
                status: 'Cancelled',
                date: new Date(),
                userId: props.order.userId,
                break: props.order.break,
                reason: reason,
            })
            .then(() => {
                bottomSheetCancel.current?.dismiss();
                navigation.goBack();
            })
        }
    }

    return (
        <BottomSheetModal
            ref={bottomSheetCancel}
            index={1}
            snapPoints={['45%', '45%']}
        >
            <View style={styles.cancelledContainer}>
                <BottomSheetTextInput placeholder="Ingrese el Motivo" value={reason} onChangeText={setReason} style={styles.cancelledText} />
                <TouchableOpacity style={styles.confirmButton} onPress={confirmCancel}>
                    <Text style={styles.confirmText}>Confirmar Cancelacion</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
}

export default BottomSheetCancel

const styles = StyleSheet.create({
    cancelledContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cancelledText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 24,
        width: '90%',
        height: '60%',
        padding: 10,

    },
    confirmButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        margin: 15,
        borderRadius: 24,
        width: '90%',
    },
    confirmText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})