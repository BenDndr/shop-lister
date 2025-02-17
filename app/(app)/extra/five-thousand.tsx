import {View, StyleSheet} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomButton } from "@/components/CustomButton"
import { Link, useRouter } from "expo-router"
import { useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '@/store/hooks'

export default function FiveThousand() {

    const route = useRoute();
    console.log("5KRoute", route)
    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)

    console.log("fivek", fivek)

    return (
        <PageContainer color1={Colors.orange300} color2={Colors.orange100} gradient>
            <ThemedText>5K</ThemedText>
            <CustomButton hapticFeel color={{color1: Colors.teal300, color2: Colors.teal100}} text={"Go back"} onPress={() => router.push("/extra")}/>
        </PageContainer>
    )
}

const StyleSheets = StyleSheet.create({

})