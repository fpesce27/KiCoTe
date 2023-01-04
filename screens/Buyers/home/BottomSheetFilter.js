import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from 'react-native-paper';
import InteractionButton from '../../components/InteractionButton';
import { categories } from '../../constants';
import FilterCategories from './FilterCategories';

const BottomSheetFilter = (props) => {

    const theme = useTheme()
    const [minPrice, setMinPrice] = React.useState(props.filters[0].minPrice)
    const [maxPrice, setMaxPrice] = React.useState(props.filters[0].maxPrice)

    React.useEffect(() => {
        if (minPrice !== props.filters[0].minPrice || maxPrice !== props.filters[0].maxPrice) {
            props.setFilters([{ minPrice: minPrice, maxPrice: maxPrice }, { categories: props.filters[1].categories }])
        }
    }, [minPrice, maxPrice])

    const clearFilters = () => {
        setMinPrice(0)
        setMaxPrice(500)
        props.setFilters([ { minPrice: 0, maxPrice: 500 }, { categories:[] } ])
    }

    return (
    <BottomSheetModal
        ref={props.bottomSheetFilter}
        backdropComponent={BottomSheetBackdrop}
        index={1}
        snapPoints={['95%', '95%']}
    >
        <BottomSheetView style={styles.filterContainer}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
                <Text style={styles.filterTitle}>Filtros</Text>
                <TouchableOpacity style={styles.exitButton} onPress={() => props.bottomSheetFilter.current?.dismiss()}>
                    <Text style={{fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
                <View style={styles.priceRangeContainer}>
                    <Text style={styles.priceTitle}>Precio</Text>
                    <Text style={styles.priceRangeText}>${props.filters[0].minPrice} - ${props.filters[0].maxPrice}</Text>
                </View>
                <View style={{marginTop:-30}}>
                    <MultiSlider
                        values={[minPrice, maxPrice]}
                        onValuesChange={(values) => {
                            setMinPrice(values[0])
                            setMaxPrice(values[1])
                        }}
                        min={0}
                        max={500}
                        sliderLength={320}
                        selectedStyle={{
                            backgroundColor: theme.colors.accent,
                        }}
                        unselectedStyle={{
                            backgroundColor: 'lightgray',
                        }}
                        trackStyle={{
                            height: 10,
                            borderRadius: 10,
                        }}
                        customMarker={() => {
                            return (
                                <View style={{...styles.marker, backgroundColor:theme.colors.accent}} />
                            )
                        }}
                        enableLabel
                        customLabel={(values) => {
                            return (
                                <View>
                                    <View style={{...styles.labelContainer, left: values.oneMarkerLeftPosition, top:30}}>
                                        <Text style={styles.labelText}>{values.oneMarkerValue}</Text>
                                    </View>
                                    <View style={{...styles.labelContainer, left: values.twoMarkerLeftPosition}}>
                                        <Text style={styles.labelText}>{values.twoMarkerValue}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>

            <View style={styles.priceContainer}>
                <View style={styles.priceRangeContainer}>
                    <Text style={styles.priceTitle}>Categoría</Text>
                </View>
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        <FilterCategories category={item} filters={props.filters} setFilters={props.setFilters}/>
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    numColumns={Platform.OS === 'ios' ? 4 : 3}
                />
            </View>

        </BottomSheetView>
    </BottomSheetModal>
  )
}

export default BottomSheetFilter

const styles = StyleSheet.create({
    filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 20,
        marginTop: 0,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    filterTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 30,
    },
    clearText: {
        fontSize: 20,
        textAlign: 'center',
    },
    exitButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    priceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    priceRangeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    priceRangeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    labelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 30,
        height: 30,
        marginLeft: -15,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: 'white',
    },
    marker: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 5,
    },
})