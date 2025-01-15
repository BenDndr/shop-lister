import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ListIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.yellow100, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Index</Text>
        </View>
    )
}