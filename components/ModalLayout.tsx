import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '@/constants/Colors';

export function ModalLayout({
    closeModal,
    children,
    heightProps
}: {
    closeModal: () => void
    children?: React.ReactNode
    heightProps: number
}) {

    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width

    return (
        <View style={{height: height, width: width, zIndex: 10, position: 'absolute'}}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View  style={styles.outerLayout}/>
            </TouchableWithoutFeedback>
            <View style={[styles.innerModal, {height: heightProps}]}>
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
        backgroundColor: 'rgba(0, 0, 0, .2)',
        // backgroundColor: 'red',
    },
    innerModal: {
        backgroundColor: Colors.backGround,
        borderRadius: 16,
        position: 'absolute',
        top: "30%",
        alignSelf: 'center',
        left: '5%',
        width: '90%',
        marginBottom: 20,
        // height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
})