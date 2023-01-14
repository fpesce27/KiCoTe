import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../db/firebase';
import { useTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

const BottomSheetConfirm = (props) => {
    
    const navigation = useNavigation();
    const bottomSheetConfirm = props.bottomSheetConfirm;
    const theme = useTheme();

    const confirmCompletion = () => {
        db.collection('activeOrders').doc(props.orderId).delete();
        db.collection('users').doc(props.order.userId).collection('orders').add({
            items: props.order.items,
            total: props.order.total,
            status: 'Completed',
            date: new Date(),
            userId: props.order.userId,
            break: props.order.break,
        })
        db.collection('users').doc(auth.currentUser.uid).collection('orders').add({
            items: props.order.items,
            total: props.order.total,
            status: 'Completed',
            date: new Date(),
            userId: props.order.userId,
            break: props.order.break,
        }).then(async () => {
            let notificationToken = '';
            await db.collection('users').doc(props.order.userId).get().then((doc) => {
                notificationToken = doc.data().notificationToken;
            }).then(async () => {
                await fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Accept-encoding': 'gzip, deflate',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: notificationToken.data,
                        sound: 'default',
                        title: 'Tu pedido esta listo!',
                        body: 'Tu pedido para (' + props.order.break.name + ') de (' + props.order.items.map((item) => item.cartItem.name).join(', ') + ') esta listo!',
                        data: { data: 'goes here' },
                    }),
                });
            })    
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
                        <TouchableOpacity style={{...styles.confirmButton, backgroundColor:theme.colors.accent}} onPress={confirmCompletion}>
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
