import { SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import Header from './Header';
import Body from './Body';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';

const Home = () => {

    const [searchPhrase, setSearchPhrase] = React.useState('');
    const [bottomSheetFilter, setBottomSheetFilter] = React.useState(React.useRef(null)) 
    const theme = useTheme()
    

    return (
        <BottomSheetModalProvider>
            <LinearGradient colors={['#FBAB7E', '#F7CE68']} style={{ flex: 1 }} 
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
            <SafeAreaView style={{marginTop:25}}>
                <StatusBar style="auto" />
                <Header searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} bottomSheetFilter={bottomSheetFilter}/>
                <Body searchPhrase={searchPhrase} bottomSheetFilter={bottomSheetFilter}/>
            </SafeAreaView>
            </LinearGradient>
        </BottomSheetModalProvider>
    )
}

export default Home;


