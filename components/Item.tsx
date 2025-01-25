import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Colors} from '@/constants/Colors'

export type ItemsState = {
    name: string
    remove: () => void
}

export function Item({name, remove} : ItemsState) {

    return (
        <TouchableOpacity style={styles.itemContainer}>
            <Text>{name}</Text>
            <TouchableOpacity onPress={remove} style={styles.removeButton}>
                <Text>X</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    removeButton: {
        padding: 8,
        backgroundColor: Colors.pink500,
        borderRadius: 8
    }
})