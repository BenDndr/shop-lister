import { TouchableOpacity, StyleSheet, Vibration, StyleProp, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { LinearGradient } from 'expo-linear-gradient';

export function CustomButton({
    text, 
    color, 
    onPress, 
    lightText, 
    hapticFeel, 
    style
} : {
    text: string
    color: {color1: string, color2: string}
    onPress: () => void
    lightText?: boolean
    hapticFeel?: boolean
    style?: StyleProp<ViewStyle>
}) {

    const onPressIn = () => {
        onPress()
        hapticFeel && Vibration.vibrate(10);
    }

    return (
        <TouchableOpacity 
            onPress={onPressIn} 
            style={[styles.container, {shadowColor: color.color1, backgroundColor: color.color2}, style]}
            activeOpacity={.6}
        >
            <LinearGradient
                colors={[color.color1, color.color2]}
                style={styles.button}
                start={{x: 0.5, y: 0.5}}
                end={{x: -0.5, y: 1}}
            >
                <ThemedText light={lightText}>{text}</ThemedText>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        top: 1,
        left: 1,
    }
})