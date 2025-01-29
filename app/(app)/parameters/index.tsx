import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';

export default function ParametersIndex() {

    return (
        <View style={{flex: 1}}>
            <PageContainer color1={Colors.orange300} color2={Colors.orange100} gradient>
                <Text>Parametersd</Text>
                <FontAwesomeIcon icon={faMugSaucer} />
                <TextInput
                    placeholder='Item name'
                    onChangeText={(e) => console.log(e)}
                />
                <CustomButton lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Take me home to dinner !"} onPress={() => console.log("Hello")}/>
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({

})