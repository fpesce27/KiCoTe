import { SafeAreaView } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { useTheme } from 'react-native-paper'

const Loading = () => {
    
    const theme = useTheme()
    
    return (
        <SafeAreaView>
            <Spinner
                visible={true}
                overlayColor={'#fff'}
                color={theme.colors.accent}
            />
        </SafeAreaView>
    )
}

export default Loading