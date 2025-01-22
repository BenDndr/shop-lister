import { TouchableOpacity, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    text: string
    color: {color1: string, color2: string}
    onPress: () => void
}

export function CustomButton({text, color, onPress} : Props) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={{...styles.container, shadowColor: color.color1, backgroundColor: color.color2}}
            activeOpacity={.6}
        >
            <LinearGradient
                colors={[color.color1, color.color2]}
                style={styles.button}
                start={{x: 0.5, y: 0.5}}
                end={{x: -0.5, y: 1}}
            >
                <ThemedText>{text}</ThemedText>
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
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        top: 1,
        left: 1,
    }
})