import {TextInput, StyleSheet} from "react-native"
import {Colors} from "@/constants/Colors"

export type CustomInputTypes = {
    placeholder: string
    onChangeText?: (e: string) => void
    validate: () => void
    value: string
}

export function CustomInput({placeholder, validate, value, onChangeText}: CustomInputTypes) {
    return (
        <TextInput 
            style={styles.input} 
            placeholder={placeholder} 
            value={value} 
            onSubmitEditing={ validate}
            onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        width: 300,
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.grey100,
        marginBottom: 8,
        marginTop: 8,
    }
})