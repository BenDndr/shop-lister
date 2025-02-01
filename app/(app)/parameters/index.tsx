import { View, Text, StyleSheet, TextInput, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import { ModalLayout } from '@/components/ModalLayout';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';

export default function ParametersIndex() {
    
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{flex: 1}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalLayout closeModal={() => setModalVisible(false)}>
                    <View>
                        <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Are you sure you want to clear the list ?</ThemedText>
                        <CustomButton style={{width: 300, marginBottom: 10}} lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Yes"} onPress={() => console.log("Billy")}/>
                        <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.orange300, color2: Colors.orange100}} text={"No"} onPress={() => setModalVisible(false)}/>
                    </View>
                </ModalLayout>
            </Modal>
            <PageContainer color1={Colors.orange300} color2={Colors.orange100} gradient>
                <Text>Parametersd</Text>
                <FontAwesomeIcon icon={faMugSaucer} />
                <TextInput
                    placeholder='Item name'
                    onChangeText={(e) => console.log(e)}
                />
                <CustomButton lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Take me home to dinner !"} onPress={() => setModalVisible(true)}/>
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({

})