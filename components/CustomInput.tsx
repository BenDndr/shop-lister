import {TextInput, StyleSheet, StyleProp, TextStyle} from "react-native"
import {Colors} from "@/constants/Colors"

export function CustomInput({
    placeholder, 
    validate, 
    value, 
    onChangeText,
    style,
    keyboardType
}: {
    placeholder: string
    onChangeText?: (e: string) => void
    validate?: () => void
    value: string
    style?: StyleProp<TextStyle>
    keyboardType?: "default" | "numeric"
}) {
    return (
        <TextInput 
            style={[styles.input, style]} 
            placeholder={placeholder}
            value={value} 
            onSubmitEditing={validate ? validate : undefined}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.grey100,
        marginBottom: 8,
        marginTop: 8,
    }
})