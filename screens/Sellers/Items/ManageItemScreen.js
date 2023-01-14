import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../../components/Controls'
import InteractionButton from '../../components/InteractionButton'
import { TextInput, useTheme, List } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { categories as c } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { auth, db, storage } from '../../../db/firebase'
import { useNavigation } from '@react-navigation/native'
import Background from '../../components/Background'
import RNImageToBase64 from 'react-native-image-base64';

const ManageItemScreen = ({route}) => {

    const theme = useTheme()
    const navigation = useNavigation()
    const [name, setName] = React.useState(route.params ? { value: route.params.item.name, error: '' } : { value: '', error: '' })
    const [price, setPrice] = React.useState(route.params ? { value: route.params.item.price, error: '' } : { value: '', error: '' })
    const [description, setDescription] = React.useState(route.params ? { value: route.params.item.description, error: '' } : { value: '', error: '' })
    const [categories, setCategories] = React.useState(route.params ? route.params.item.categories : [])
    const [image, setImage] = React.useState(route.params ? route.params.item.image : null)
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        if (name.value.length > 0 && price.value > 0 && description.value.length > 0 && categories.length > 0) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [name, price, description, categories])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
      }

    const getUrl = async (image) => {
        const response = await fetch(image)
        const blobFile = await response.blob()
    
        const reference = storage.ref(`items/${image}`)
        const result = await reference.put(blobFile)
        const url = await result.ref.getDownloadURL()
        return url
    }

    const addItem = async () => {
        try {
            
            const url = await getUrl(image)

            db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
                db.collection('items').add({
                    name: name.value,
                    price: price.value,
                    description: description.value,
                    categories: categories,
                    image: url,
                    schoolId: doc.data().schoolId,
                })
            })

            navigation.goBack()
        } 
        catch (err) {
            return Promise.reject(err)
        }
    }

    const editItem = async () => {
        if (route.params.item.image !== image) {
            storage.refFromURL(route.params.item.image).delete()
        }
        const url = await getUrl(image)
        db.collection('items').doc(route.params.item.id).update({
            name: name.value,
            price: price.value,
            description: description.value,
            categories: categories,
            image: url
        })
        navigation.goBack()
    }

    return (
        <Background>
        <SafeAreaView>
            <KeyboardAvoidingView behavior="position">
                <BackButton />
                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={{...styles.title, color:theme.colors.secondary}}>
                            {route.params ? 'Editar' : 'Agregar'} Item
                        </Text>
                        <Text style={{...styles.subtitle, color:theme.colors.secondary}}>{route.params ? 'Edite' : 'Agregue'} los detalles del item</Text>
                    </View>

                    <View style={styles.image}>
                        <View style={{width:'80%'}}>
                            <InteractionButton text="Seleccionar Imagen"  onPress={pickImage} background={ image ? theme.colors.accent : theme.colors.primary} color={image ? theme.colors.primary : theme.colors.secondary} />
                        </View>
                        <View style={{width:'20%'}}>
                            <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius:100 }} />
                        </View>
                    </View>
                    <View style={{...styles.inputContainer, backgroundColor:theme.colors.primary}}>
                        <List.Accordion
                            title={categories.length > 0 ? categories.join(', ') : 'Categoría/s'}
                            left={props => <List.Icon {...props} icon="tag" color={theme.colors.secondary} />}
                            titleStyle={{ color: theme.colors.secondary }}
                            style={{ borderRadius:24 , backgroundColor: categories.length > 0 ? theme.colors.accent : theme.colors.primary}}
                            right={props => <List.Icon {...props} icon="chevron-down" color={theme.colors.secondary} />}
                            
                        >
                            <FlatList
                                data={c}
                                renderItem={({ item }) =>
                                    <List.Item
                                        title={item}
                                        style={{ backgroundColor: theme.colors.primary, marginLeft:-65  }}
                                        titleStyle={{ color: categories.includes(item) ? theme.colors.accent : theme.colors.secondary }}
                                        left={props => <List.Icon {...props} icon={categories.includes(item) ? 'check' : 'checkbox-blank-outline'} color={categories.includes(item) ? theme.colors.accent : theme.colors.secondary} />}
                                        onPress={() => { categories.includes(item) ? setCategories(categories.filter(c => c !== item)) : setCategories([...categories, item]) }}
                                    />
                                }
                            />
                        </List.Accordion>
                    </View>

                    <View style={{...styles.inputContainer, backgroundColor: name.value.length > 0 ? theme.colors.accent : theme.colors.primary}}>
                        <TextInput
                            placeholder='Nombre del Item'
                            value={name.value}
                            onChangeText={text => setName({ value: text, error: '' })}
                            textColor={name.value.length > 0 ? theme.colors.secondary : theme.colors.accent}
                            
                        />
                    </View>

                    <View style={{...styles.inputContainer, backgroundColor: price.value > 0 ? theme.colors.accent : theme.colors.primary}}>
                        <TextInput
                            placeholder='Precio'
                            value={price.value}
                            onChangeText={text => setPrice({ value: text, error: '' })}
                            keyboardType='numeric'
                            textColor={price.value > 0 ? theme.colors.secondary : theme.colors.accent}
                        />
                    </View>

                    <View style={{...styles.inputContainer, backgroundColor: description.value.length > 0 ? theme.colors.accent : theme.colors.primary}}>
                        <TextInput
                            placeholder='Descripción'
                            value={description.value}
                            onChangeText={text => setDescription({ value: text, error: '' })}
                            textColor={description.value.length > 0 ? theme.colors.secondary : theme.colors.accent}
                        />
                    </View>

                    <InteractionButton text={route.params ? 'Editar Item' : 'Agregar Item'} disabled={disabled} background={disabled ? theme.colors.primary : theme.colors.accent} color={disabled ? theme.colors.secondary : theme.colors.primary} onPress={route.params ? editItem : addItem} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </Background>
    )
}

export default ManageItemScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: -20,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.5,
    },
    inputContainer: {
        margin: 15,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        borderRadius: 24,
        width: '95%',
    },
    image: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})