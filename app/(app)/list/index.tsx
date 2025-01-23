import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';

export default function ListIndex() {

    return (
        <View style={{flex: 1, backgroundColor: Colors.pink100}}>
           <PageContainer color1={Colors.pink300} color2={Colors.pink100} gradient>
                <View style={styles.paralaxHeader}>

                </View>
                <View style={styles.content}>
                    <Text>Index</Text>
                    <FontAwesomeIcon icon={faList} />
                </View>
           </PageContainer>
            
        </View>
    )
}

const styles = StyleSheet.create({
    paralaxHeader: {

    },
    content: {

    }
})
