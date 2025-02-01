import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

export function ModalLayout({
    closeModal,
    children
}: {
    closeModal: () => void
    children?: React.ReactNode
}) {

    return (
        <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.outerLayout} />
            </TouchableWithoutFeedback>
            <View style={styles.innerModal}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerLayout: {
        padding: 40,
        width: '100%',
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, .3)'
    },
    innerModal: {
        backgroundColor: Colors.backGround,
        borderRadius: 16,
        position: 'absolute',
        top: "15%",
        alignSelf: 'center',
        left: '5%',
        width: '90%',
        marginBottom: 20,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center'
    }
})