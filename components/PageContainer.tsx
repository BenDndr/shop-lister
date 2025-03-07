import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export function PageContainer({ 
    color1, 
    color2, 
    children, 
    gradient, 
    style 
}: {
    gradient?: boolean;
    color1?: string;
    color2?: string;
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}) {

return (
    <View style={{flex: 1}}>
        {gradient ? <LinearGradient
            colors={[color1 || Colors.backGround, color2 || Colors.backGround]}
            style={[styles.background, style]}
        >
            {children}
        </LinearGradient>
        :
        <View style={[styles.background, style]}>
            {children}
        </View>
        }
    </View>
    ) 
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    },
});