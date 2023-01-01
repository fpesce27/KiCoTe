import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../db/firebase';

const BottomSheetConfirm = (props) => {
    
    const navigation = useNavigation();
    const bottomSheetConfirm = props.bottomSheetConfirm;

    const confirmCompletion = () => {
        db.collection('Buyers').doc(props.userId).collection('orders').doc(props.order.id).update({
            status: 'completed'
        })
        bottomSheetConfirm.current?.dismiss();
        navigation.goBack();
    }
  
    return (
    <BottomSheetModal
                    ref={bottomSheetConfirm}
                    index={1}
                    snapPoints={['27%', '27%']}
                >
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmTitle}>¿Completar Orden?</Text>
                        <TouchableOpacity style={styles.confirmButton} onPress={confirmCompletion}>
                            <Text style={styles.confirmText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>
  )
}

export default BottomSheetConfirm

const styles = StyleSheet.create({
    confirmContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    confirmTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#007AFF',
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