import { View, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Options from './Options'
import Data from './Data'
import Logout from './Logout'
import InteractionButton from '../../components/InteractionButton'

const Profile = () => {
  return (
    <SafeAreaView>
        <View style={styles.profile}>
            <Data />
        </View>
        <View style={styles.profileOptions}>
            <Options />
            <Logout />
        </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    profile: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
})