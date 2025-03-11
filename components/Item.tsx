import {View, Keyboard, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextInput} from 'react-native'
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
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
    const translateX = useSharedValue<number>(0);
    const opacity = useSharedValue<number>(.2);
    const translateY = useSharedValue<number>(10);

    useEffect(() => {
        // width.value = withSpring(360);
        translateY.value = withSpring(0);
        opacity.value = withSpring(1);
    }, [])

    const discardItem = () => {
        // translateY.value = withSpring(10);
        // opacity.value = withTiming(0, {duration: 300});
        // setTimeout(() => {
            remove()
        // }, 300)
    }

    return (
        <Animated.View style={{translateX, opacity, translateY}}>
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
                    <TouchableOpacity onPress={() => {activateEditMode(index)}} style={{...styles.actionButton, backgroundColor: Colors.blue500}}>
                        <FontAwesomeIcon icon={faPen} color={Colors.backGround}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={discardItem} style={{...styles.actionButton, backgroundColor: Colors.orange500}}>
                        <FontAwesomeIcon icon={faCheck} color={Colors.pink900}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
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