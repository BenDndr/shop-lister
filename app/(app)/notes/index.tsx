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

export default function NoteIndex() {

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                <ThemedText type="title">Notes</ThemedText>
            </View>
            <View style={styles.content}>
                <CustomButton lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Take me home to dinner !"} onPress={() => console.log(true)}/>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        width: "100%",
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    content: {
        width: "95%",
        padding: 10,
        paddingBottom: 75,
        flex: 1,
        backgroundColor: Colors.backGround,
        marginLeft: 12,
        marginRight: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
})