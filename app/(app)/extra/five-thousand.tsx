import { useState } from "react"
import {View, StyleSheet} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomInput } from "@/components/CustomInput"
import { CustomButton } from "@/components/CustomButton"
import { useRouter } from "expo-router"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addPlayer } from '@/store/slices/fivekSlice'

export default function FiveThousand() {

    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)
    const [newPlayer, setNewPlayer] = useState("")
    const dispatch = useAppDispatch()

    console.log("fivek", fivek)

    const createPlayer = () => {
        dispatch(addPlayer(newPlayer))
        setNewPlayer("")
    }

    return (
        <PageContainer color1={Colors.teal500} color2={Colors.teal300} gradient>
            <View style={styles.content}>
                <View style={styles.header}>
                    <ThemedText type="title">5K</ThemedText>
                </View>
                <View style={styles.body}>
                    <CustomInput placeholder="Enter your name" value={newPlayer} onChangeText={(e) => setNewPlayer(e)} validate={createPlayer}/>
                    {fivek.players.map((player, index) => (
                        <ThemedText key={index}>{player.name}</ThemedText>
                    ))}
                    <CustomButton hapticFeel lightText color={{color1: Colors.blue500, color2: Colors.blue700}} text={"Go back"} onPress={() => router.push("/extra")} style={{marginTop: "auto"}}/>

                </View>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "90%",
        height: "100%",
    },
    header: {
        height: "20%",
        justifyContent: "flex-end"
    },
    body: {
        height: "70%",
    }
})