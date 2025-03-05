import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { useEffect, useRef } from 'react'
import { Colors } from '@/constants/Colors';

export function ModalLayout({
    closeModal,
    children,
    heightProps,
    topProp,
}: {
    closeModal: () => void
    children?: React.ReactNode
    heightProps: number
    topProp?: number
}) {

    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width

    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleClose = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => closeModal());
    };


    return (
        <Animated.View style={{height: "100%", width: width, zIndex: 10, position: 'absolute', opacity: fadeAnim}}>
            <TouchableWithoutFeedback onPress={handleClose}>
                <View  style={styles.outerLayout}/>
            </TouchableWithoutFeedback>
            <View style={[styles.innerModal, {height: heightProps, top: topProp || "30%"}]}>
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    outerLayout: {
        padding: 40,
        width: '100%',
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    innerModal: {
        backgroundColor: Colors.backGround,
        borderRadius: 16,
        position: 'absolute',
        // top: "30%",
        alignSelf: 'center',
        left: '5%',
        width: '90%',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})