import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faOtter } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';

export default function AboutIndex() {

    return (
        <PageContainer color1={Colors.blue300} color2={Colors.orange500} gradient>
            <View style={styles.presCard}>
                <Image
                    style={styles.avatar}
                    source={require("../../../assets/images/Profile-pic.png")}
                />
                <ThemedText type="subtitle">Who am I ?</ThemedText>
                <Text>My name is Benjamin Dandre, I'm a web and mobile developper and this is one of my personal project. I'm currently looking for a job, if your searching for a developper feel free to contact me contact me.</Text>
                <FontAwesomeIcon icon={faOtter} size={24}/>
                <ThemedText type="defaultSemiBold">You want to get in touch ?</ThemedText>
                <ThemedText>test@gmail.com</ThemedText>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    presCard: {
        height: '50%',
        backgroundColor: Colors.backGround,
        width: "80%",
        padding: 42,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        gap: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Colors.backGround,
        borderWidth: 4,
        position: "absolute",
        top: -50,
    }
})