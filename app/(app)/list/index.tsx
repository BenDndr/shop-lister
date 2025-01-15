import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ListIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.pink100, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.paralaxHeader}>

            </View>
            <View style={styles.content}>
                <Text>Index</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    paralaxHeader: {

    },
    content: {

    }
})
