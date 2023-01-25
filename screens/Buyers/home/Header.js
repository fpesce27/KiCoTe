import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon, BellAlertIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { auth } from '../../../db/firebase';
import { useTheme } from 'react-native-paper';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {

  const theme = useTheme()

  return (
    <View style={{ backgroundColor: theme.colors.accent, borderBottomEndRadius:24, borderBottomStartRadius:24, paddingTop:40 }}>
      
      <View style={styles.headerTop}>

        <View style={styles.headerLeft}>

          <View className='flex-col space-y-2'>
            <Text style={{...styles.headerText, color:theme.colors.text}}>Bienvenido, </Text>
            <Text style={{...styles.textName, color:theme.colors.text}}>{auth.currentUser.displayName}</Text>
          </View>

        </View>

        <View className='flex-row space-x-4'>

            <Image
              style={styles.logo}
              source={{ uri: auth.currentUser.photoURL }}
              
            />

        </View>

      </View>

      <View style={{ padding: 20, flexDirection: 'row' }}>

          <SearchBar searchPhrase={props.searchPhrase} setSearchPhrase={props.setSearchPhrase} />

          <TouchableOpacity onPress={() => props.bottomSheetFilter.current?.present()} style={{ ...styles.icon, backgroundColor:theme.colors.secondary }}>
            <AdjustmentsHorizontalIcon style={{ color: theme.colors.accent }} />
          </TouchableOpacity>

      </View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  headerText: {
    marginRight: 10,
    fontSize: 16,
    opacity: 0.5,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    width: 65,
    height: 65,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
})