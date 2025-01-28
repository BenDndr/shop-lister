import {TextInput, StyleSheet, StyleProp, TextStyle} from "react-native"
import {Colors} from "@/constants/Colors"

export function CustomInput({
    placeholder, 
    validate, 
    value, 
    onChangeText,
    style
}: {
    placeholder: string
    onChangeText?: (e: string) => void
    validate?: () => void
    value: string
    style?: StyleProp<TextStyle>
}) {
    return (
        <TextInput 
            style={[styles.input, style]} 
            placeholder={placeholder} 
            value={value} 
            onSubmitEditing={validate ? validate : undefined}
            onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        // width: 300,
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.grey100,
        marginBottom: 8,
        marginTop: 8,
    }
})