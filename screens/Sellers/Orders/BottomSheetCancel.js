import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../db/firebase';

const BottomSheetCancel = (props) => {

    const navigation = useNavigation();
    const bottomSheetCancel = props.bottomSheetCancel;
    const [reason, setReason] = React.useState('')

    const confirmCancel = () => {
        if (reason === '') {
            alert('Please enter a reason for cancelling the order')
        } else {
            db.collection('Buyers').doc(props.userId).collection('orders').doc(props.order.id).update({
                status: 'cancelled',
                reason: reason
            })
            bottomSheetCancel.current?.dismiss();
            navigation.goBack();
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
        borderRadius: 10,
        width: '90%',
        height: '60%',
        padding: 10,

    },
    confirmButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        width: '90%',
    },
    confirmText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})