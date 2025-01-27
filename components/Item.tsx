import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native'
import {Colors} from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons'

export function Item({
    name, 
    remove,
    style
} : {
    name: string
    remove: () => void
    style?: StyleProp<ViewStyle>
}) {

    return (
        <TouchableOpacity style={[styles.itemContainer, style]}>
            <ThemedText>{name}</ThemedText>
            <View style={styles.actionView}>
                <TouchableOpacity onPress={() => console.log("edit")} style={{...styles.actionButton, backgroundColor: Colors.blue100}}>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4
    },
    actionView: {
        flexDirection: 'row',
        gap: 4
    },
    actionButton: {
        padding: 8,
        borderRadius: 8
    }
})