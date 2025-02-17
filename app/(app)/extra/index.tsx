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
                <FontAwesomeIcon icon={faMugSaucer} />
                <CustomButton lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Go to 5000 counter"} onPress={() => router.push("/extra/five-thousand")}/>
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({

})