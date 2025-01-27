import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Colors} from '@/constants/Colors'

export function Item({
    name, 
    remove
} : {
    name: string
    remove: () => void
}) {

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
        alignItems: 'center',
        width: '100%',
    },
    removeButton: {
        padding: 8,
        backgroundColor: Colors.pink500,
        borderRadius: 8
    }
})