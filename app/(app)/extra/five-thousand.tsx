import { useState } from "react"
import {View, StyleSheet} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomInput } from "@/components/CustomInput"
import { CustomButton } from "@/components/CustomButton"
import { Link, useRouter } from "expo-router"
import { useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '@/store/hooks'

export default function FiveThousand() {

    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)
    const [newPlayer, setNewPlayer] = useState("")

    console.log("fivek", fivek)

    const addPlayer = () => {
        console.log("newPlayer", newPlayer)
        setNewPlayer("")
    }

    return (
        <PageContainer color1={Colors.orange300} color2={Colors.orange100} gradient>
            <ThemedText type="subtitle">5K</ThemedText>
            <CustomInput placeholder="Enter your name" value={newPlayer} onChangeText={(e) => setNewPlayer(e)} validate={addPlayer}/>
            <CustomButton hapticFeel color={{color1: Colors.teal300, color2: Colors.teal100}} text={"Go back"} onPress={() => router.push("/extra")}/>
        </PageContainer>
    )
}

const StyleSheets = StyleSheet.create({

})