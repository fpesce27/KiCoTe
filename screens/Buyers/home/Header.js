import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { BellAlertIcon } from 'react-native-heroicons/outline';
import { auth } from '../../../db/firebase';
import { SearchBar } from './SearchBar';
import { useTheme } from 'react-native-paper';

const Header = (props) => {
  
  const theme = useTheme()

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.logo}
            source={{uri: auth.currentUser.photoURL}}
          />
          <View className='flex-col space-y-2'>
            <Text style={styles.headerText}>Welcome, </Text>
            <Text style={styles.textName}>{auth.currentUser.displayName}</Text>
          </View>
        </View>
        <View className='bg-white rounded-full w-12 h-12 items-center justify-center'>
          <BellAlertIcon color={theme.colors.primary}/>
        </View>
      </View>

      <SearchBar searchPhrase={props.searchPhrase} setSearchPhrase={props.setSearchPhrase}/>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
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
    color: '#9CA3AF',
    marginRight: 10,
    fontSize: 16,
  },
  textName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
})