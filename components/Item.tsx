import {View, Keyboard, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextInput} from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import {Colors} from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

export function Item({
    name, 
    index,
    style,
    value,
    editMode,
    remove,
    validate,
    activateEditMode,
    blurAction
} : {
    name: string
    index: number
    style?: StyleProp<ViewStyle>
    value: string
    editMode: boolean
    remove: () => void
    validate: (e: string) => void
    activateEditMode: (i: number) => void
    blurAction?: () => void
}) {

    const [editedName, setEditedName] = useState(name)

    const width = useSharedValue(200)
    const translateX = useSharedValue<number>(40);

    useEffect(() => {
        // width.value = withSpring(360);
        translateX.value = withSpring(0);
    }, [])

    return (
        <Animated.View style={{translateX}}>
            <View style={[styles.itemContainer, style]}>
                {editMode ? 
                    <TextInput
                        style={styles.editInput} 
                        placeholder={name}
                        value={editedName} 
                        onSubmitEditing={() => validate(editedName)}
                        onChangeText={(e) => setEditedName(e)}
                        autoFocus={true}
                        onBlur={blurAction}
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
            </View>
        </Animated.View>
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