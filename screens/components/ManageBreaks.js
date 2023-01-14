import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { List, TextInput, useTheme } from 'react-native-paper';
import { Dialog } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker';
import InteractionButton from './InteractionButton';

const ManageBreaks = (props) => {

    const theme = useTheme()
    const [visible, setVisible] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [breakName, setBreakName] = React.useState('')
    const [breakStart, setBreakStart] = React.useState(new Date())
    const [breakEnd, setBreakEnd] = React.useState(new Date())

    const deleteBreak = (item) => {
        props.setBreaks(props.breaks.filter(breaks => breaks.id !== item.id))
    }

    const addItem = () => {
        props.setBreaks([...props.breaks, { break: { name: breakName, start: breakStart, end: breakEnd } }])
    }

    const editItem = () => {
        props.setBreaks(props.breaks.map(breaks => breaks.id === id ? { id: id, break: { name: breakName, start: breakStart, end: breakEnd } } : breaks))
    }

    const handleEdit = (item) => {
        setShowEdit(true)
        setVisible(true)
        setBreakName(item.break.name)
        setBreakStart(item.break.start)
        setBreakEnd(item.break.end)
    }

    return (
        <>
            <View style={styles.inputContainer}>

                <List.Accordion
                    title='Recreos'
                    titleStyle={{ color: theme.colors.primary }}
                    style={{ borderRadius: 24, backgroundColor: theme.colors.secondary }}
                    left={props => <List.Icon {...props} icon="clock" color={theme.colors.primary} />}
                    right={props => <List.Icon {...props} icon="chevron-down" color={theme.colors.primary} />}
                >
                    <FlatList
                        data={props.breaks}
                        renderItem={({ item }) =>
                            <List.Item
                                title={item.break.name}
                                titleStyle={{ color: theme.colors.primary }}
                                right={props => (
                                    <TouchableOpacity onPress={() => deleteBreak(item)}>
                                        <List.Icon {...props} icon="delete" color={theme.colors.primary} />
                                    </TouchableOpacity>
                                )}
                                left={props => (
                                    <TouchableOpacity onPress={() => handleEdit((item))}>
                                        <List.Icon {...props} icon="pencil" color={theme.colors.primary} />
                                    </TouchableOpacity>
                                )}
                                style={{ marginLeft: -64 }}
                            />
                        }
                    />

                    <TouchableOpacity onPress={addItem} style={{ marginLeft: -64 }}>
                        <List.Item
                            title='Agregar'
                            titleStyle={{ color: theme.colors.primary }}
                            style={{ backgroundColor: theme.colors.accent, borderBottomEndRadius: 24, borderBottomStartRadius: 24 }}
                            left={props => <List.Icon {...props} icon="plus" color={theme.colors.primary} />}
                            onPress={() => setVisible(true)}
                        />
                    </TouchableOpacity>

                </List.Accordion>

            </View>

            <Dialog visible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={{ backgroundColor: theme.colors.primary, borderRadius: 24 }}>

                <Dialog.Title title={showEdit ? "Editar Recreo" : "Agregar Recreo"} titleStyle={{ color: theme.colors.secondary }} />

                <TextInput
                    placeholder='Nombre'
                    placeholderTextColor={theme.colors.secondary}
                    underlineColor={theme.colors.secondary}
                    selectionColor={theme.colors.secondary}
                    textColor={theme.colors.accent}
                    value={breakName}
                    onChangeText={setBreakName}
                />
                <View style={{ padding: 10 }}>
                    <Text style={{ color: theme.colors.secondary }}>Hora de inicio</Text>
                    <DateTimePicker
                        value={breakStart}
                        mode='time'
                        display='spinner'
                        onChange={
                            (event, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setBreakStart(currentDate)
                            }
                        }
                        style={{ height: 100 }}
                        textColor={theme.colors.accent}
                    />
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={{ color: theme.colors.secondary }}>Hora de Finalización</Text>
                    <DateTimePicker
                        value={breakEnd}
                        mode='time'
                        display='spinner'
                        onChange={
                            (event, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setBreakEnd(currentDate)
                            }
                        }
                        style={{ height: 100 }}
                        textColor={theme.colors.accent}
                    />
                </View>

                <Dialog.Actions>
                    <InteractionButton
                        text={showEdit ? "Editar" : "Agregar"}
                        onPress={
                            () => {
                                setVisible(false)
                                if (showEdit) {
                                    editItem()
                                    setShowEdit(false)
                                } else {
                                    addItem()
                                }
                            }
                        }
                    />
                </Dialog.Actions>

            </Dialog>
        </>
    )
}

export default ManageBreaks

const styles = StyleSheet.create({})