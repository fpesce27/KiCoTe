import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native'
import React from 'react'
import Header from './Header';
import Body from './Body';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';
import Background from '../../components/Background';
import * as Notifications from 'expo-notifications';
import { db, auth } from '../../../db/firebase';

const Home = () => {

    const [searchPhrase, setSearchPhrase] = React.useState('');
    const [bottomSheetFilter, setBottomSheetFilter] = React.useState(React.useRef(null))
    const theme = useTheme() 
    
    React.useEffect(() => {
        (async () => {
          await Notifications.requestPermissionsAsync();
          const token = await Notifications.getExpoPushTokenAsync();

          db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
            if (doc.exists) {
                db.collection('users').doc(auth.currentUser.uid).update({
                    notificationToken: token
                })
            } else {
                db.collection('users').doc(auth.currentUser.uid).set({
                    notificationToken: token
                })
            }
          })
        })();
      }, []);

    return (
        <BottomSheetModalProvider>
            <Background>
            <View>
                
                <Header searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} bottomSheetFilter={bottomSheetFilter}/>
                <Body searchPhrase={searchPhrase} bottomSheetFilter={bottomSheetFilter}/>
                
            </View>
            </Background>
        </BottomSheetModalProvider>
    )
}

export default Home;


