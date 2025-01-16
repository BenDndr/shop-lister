import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function ListIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.pink100}}>
            <LinearGradient
                colors={[Colors.pink300, Colors.pink100]}
                style={styles.gradient}
            >
                <View style={styles.paralaxHeader}>

                </View>
                <View style={styles.content}>
                    <Text>Index</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    paralaxHeader: {

    },
    content: {

    }
})
