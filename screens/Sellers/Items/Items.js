import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { SearchBar } from '../../../screens/Buyers/home/SearchBar'
import { db } from '../../../db/firebase'
import { ScrollView } from 'react-native'
import { Item } from '../../components/Item'
import { items as i } from '../../constants'

const Items = () => {
  
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    /* db.collection('Sellers').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setItems(doc.data().items)
      })
    }) */
    setItems(i)
  }, [])

  console.log(items)
  
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.searchBar}>
        <View style={{width: '90%'}}>
          <SearchBar />
        </View>
      </View>
      <View>
        <ScrollView>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Items

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Items</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 15,
    flexDirection: 'row',
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '65%',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  addButtonText: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
  },
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})