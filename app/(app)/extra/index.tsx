import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

export default function ExtraIndex() {

    const route = useRoute();
    console.log("IndexRoute", route)
    const router = useRouter()

    return (
        <View style={{flex: 1}}>
            <PageContainer color1={Colors.teal300} color2={Colors.teal100} gradient>
                <ThemedText type="title">Extra</ThemedText>
                <View style={styles.extraCard}>
                    <ThemedText type="subtitle">5K Counter</ThemedText>
                    <ThemedText>
                        5K is a dice game where your goal is to reach 5000 points before your opponent. This app will provide a way to keep track of the score of all players.
                    </ThemedText>
                    <CustomButton lightText hapticFeel color={{color1: Colors.blue500, color2: Colors.blue700}} text={"Go to 5000 counter"} onPress={() => router.push("/extra/five-thousand")}/>
                </View>
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    extraCard: {
        backgroundColor: Colors.backGround,
        borderRadius: 16,
        padding: 16,
        margin: 16,
        elevation: 2,
        gap: 16,
    }
})