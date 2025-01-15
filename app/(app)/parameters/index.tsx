import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ParametersIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.blue100, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Paramètres</Text>
        </View>
    )
}