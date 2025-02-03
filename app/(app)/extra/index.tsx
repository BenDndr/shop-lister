import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';

export default function ParametersIndex() {

    return (
        <View style={{flex: 1}}>
            <PageContainer color1={Colors.teal300} color2={Colors.teal100} gradient>
                <ThemedText type="title">Extra</ThemedText>
                <FontAwesomeIcon icon={faMugSaucer} />
                <CustomButton lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Go to 5000 counter"} onPress={() => console.log("Go to 5k counter")}/>
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({

})