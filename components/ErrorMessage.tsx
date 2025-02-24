import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";

export function ErrorMessage({
    visible,
    height,
    left,
    hideAction,
    content,
 } : {
    visible: boolean
    height?: number
    left?: number
    hideAction: () => void
    content: string
 }) {

    const opacity = useSharedValue<number>(0);
    
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 500 });
            setTimeout(() => {
                hideAction()     
            }, 2000)
        } else {
            opacity.value = withTiming(0, { duration: 2000 });
        }
    }, [visible])

    // TO DO : handle z-index of 0 opacity error message

    return (
        <Animated.View style={[styles.errorMessage, animatedStyle, {top: height || 0, left: left || 0}]}>
            <ThemedText>{content}</ThemedText>
            <TouchableOpacity style={{padding: 10}} onPress={hideAction}>
                <FontAwesomeIcon icon={faXmark} />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        position: 'absolute',
        width: "100%",
        backgroundColor: Colors.orange300,
        padding: 10,
        borderRadius: 12,
        zIndex: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})