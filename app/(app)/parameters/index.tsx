import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'


export default function ParametersIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.blue100}}>
            <LinearGradient
                colors={[Colors.blue300, Colors.blue100]}
                style={styles.gradient}
            >
                <Text>Parameters</Text>
                <FontAwesomeIcon icon={faMugSaucer} />
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
    }
})