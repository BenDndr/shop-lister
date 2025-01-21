import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';


export default function ParametersIndex() {

    return (
        <View style={{flex: 1}}>
            <LinearGradient
                colors={[Colors.blue300, Colors.blue100]}
                style={styles.gradient}
            >
                <Text>Parameters</Text>
                <FontAwesomeIcon icon={faMugSaucer} />
                <CustomButton color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Take me home to dinner !@@"} onPress={() => console.log("Hello")}/>
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