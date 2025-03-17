import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function ExtraIndex() {

    const router = useRouter()

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                <ThemedText type="title">Extra</ThemedText>
            </View>
            <View style={styles.body}>
                <View style={styles.extraCard}>
                    <ThemedText type="subtitle">5K Counter</ThemedText>
                    <ThemedText>
                        5K is a dice game where your goal is to reach 5000 points before your opponent. This app will provide a way to keep track of the score of all players.
                    </ThemedText>
                    <CustomButton lightText hapticFeel color={{color1: Colors.teal900, color2: Colors.teal700}} text={"Start a Game"} onPress={() => router.push("/extra/five-thousand")}/>
                </View>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "90%",
    },
    body: {
        height: "80%",
    },
    extraCard: {
        backgroundColor: Colors.backGround,
        borderRadius: 16,
        padding: 16,
        margin: 16,
        elevation: 2,
        gap: 16,
    }
})