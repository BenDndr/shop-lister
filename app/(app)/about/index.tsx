import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';

export default function AboutIndex() {

    return (
        <View style={{flex: 1}}>
            <PageContainer color1={Colors.blue300} color2={Colors.orange500} gradient>
                <Text>About</Text>
                <FontAwesomeIcon icon={faMugSaucer} />
            </PageContainer>
        </View>
    )
}

const styles = StyleSheet.create({

})