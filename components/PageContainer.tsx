import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function PageContainer({ 
    color1, 
    color2, 
    children, 
    gradient, 
    style 
}: {
    gradient?: boolean;
    color1: string;
    color2: string;
    children?: React.ReactNode,
    style?: object
}) {

return (
        <View style={{flex: 1}}>
            {gradient ? <LinearGradient
                colors={[color1, color2]}
                style={{...styles.background, ...style}}
            >
                {children}
            </LinearGradient>
            :
            <View style={{...styles.background, ...style}}>
                {children}
            </View>
            }
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    },
});