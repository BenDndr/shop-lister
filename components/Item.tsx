import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextInput} from 'react-native'
import {Colors} from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import {useState, useRef, useEffect} from 'react'

export function Item({
    name, 
    index,
    style,
    value,
    editMode,
    remove,
    validate,
    activateEditMode,
    onChangeText,
} : {
    name: string
    index: number
    style?: StyleProp<ViewStyle>
    value: string
    editMode: boolean
    remove: () => void
    validate?: () => void
    activateEditMode: (i: number) => void
    onChangeText?: (e: string) => void
}) {

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    return (
        <TouchableOpacity style={[styles.itemContainer, style]}>
            {editMode ? 
                <TextInput
                    ref={inputRef}
                    style={styles.editInput} 
                    placeholder={name}
                    value={value} 
                    onSubmitEditing={validate ? validate : undefined}
                    onChangeText={onChangeText}
                /> 
                : 
                <ThemedText>{name}</ThemedText>
            }
            <View style={styles.actionView}>
                <TouchableOpacity onPress={() => {activateEditMode(index)}} style={{...styles.actionButton, backgroundColor: Colors.blue100}}>
                    <FontAwesomeIcon icon={faPen} color={Colors.blue900}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={remove} style={{...styles.actionButton, backgroundColor: Colors.pink300}}>
                    <FontAwesomeIcon icon={faCheck} color={Colors.pink900}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.pink100,
        borderRadius: 10,
        padding: 6,
        paddingLeft: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4,
    },
    actionView: {
        flexDirection: 'row',
        gap: 4
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editInput: {
        backgroundColor: Colors.backGround,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey300,
        flex: 1,
        height: 40,
        marginRight: 16,
        padding: 6,
    }
})