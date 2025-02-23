import { useState, useEffect } from "react"
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomInput } from "@/components/CustomInput"
import { CustomButton } from "@/components/CustomButton"
import { useRouter } from "expo-router"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addPlayer, resetGame, addTurn } from '@/store/slices/fivekSlice'

export default function FiveThousand() {

    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)
    const [activePlayer, setActivePlayer] = useState("")
    const [newPlayer, setNewPlayer] = useState("")
    const dispatch = useAppDispatch()
    const [newScore, setNewScore] = useState("")

    console.log("fivek", fivek)
    console.log("players", fivek.players)
    console.log("turns", fivek.turns)

    useEffect(() => {
        if (fivek.players.length > 0) {
            setActivePlayer(fivek.players[0].name)
        }
    }, [fivek.players])

    const createPlayer = () => {
        dispatch(addPlayer(newPlayer))
        setActivePlayer(newPlayer)
        setNewPlayer("")
    }

    const addTose = (playerName: string) => {
        dispatch(addTurn({player: playerName, score: 0}))
    }

    const playerView = ({ item } : {item: { name: string }}) => {

        const Score = fivek.turns.filter(turn => turn.player == item.name).reduce((acc, turn) => acc + turn.score, 0)

        return (
            <TouchableOpacity style={[styles.playerCard, {backgroundColor: item.name == activePlayer ? Colors.orange300 : Colors.backGround}]} onPress={() => setActivePlayer(item.name)}>
                <View style={styles.leftPlayerCardContent}>
                    <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                    <View style={styles.scoresView}>
                        {fivek.turns.filter(turn => turn.player == item.name).map((turn, index) => {
                            return (
                                <ThemedText key={index}>{turn.score}</ThemedText>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.rightPlayerCardContent}>
                    <ThemedText type="defaultSemiBold">Total</ThemedText>
                    <ThemedText type="subtitle">{Score}</ThemedText>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <PageContainer color1={Colors.teal500} color2={Colors.teal300} gradient>
            <View style={styles.content}>
                <View style={styles.header}>
                    <ThemedText type="title">5K</ThemedText>
                </View>
                <View style={styles.body}>
                    <CustomInput placeholder="Enter player's name" value={newPlayer} onChangeText={(e) => setNewPlayer(e)} validate={createPlayer}/>
                    <FlatList 
                        data={fivek.players}
                        renderItem={playerView}
                        keyExtractor={(item) => item.name}
                        style={{paddingBottom: 16}}
                    />
                    <View style={{marginTop: "auto", gap: 16, paddingTop: 16}}>
                        <View style={styles.addScoreView}>
                            <CustomInput 
                                placeholder={`Add score to ${activePlayer}`} 
                                value={newScore} 
                                onChangeText={(e) => setNewScore(e)} 
                                keyboardType='numeric'
                                style={{width: "80%", height: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                                validate={() => {
                                    dispatch(addTurn({player: activePlayer, score: parseInt(newScore)}))
                                    setNewScore("")
                                }}
                            />
                            <TouchableOpacity onPress={() => addTose(activePlayer)} style={styles.toseButton}>
                                <ThemedText>Tose</ThemedText>
                            </TouchableOpacity>    
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <CustomButton hapticFeel lightText color={{color1: Colors.pink500, color2: Colors.pink700}} text={"New Game"} onPress={() => dispatch(resetGame())} style={{width: "48%"}}/>
                            <CustomButton hapticFeel lightText color={{color1: Colors.blue500, color2: Colors.blue700}} text={"Go back"} onPress={() => router.push("/extra")} style={{width: "48%"}}/>
                        </View>
                    </View>
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
    },
    playerCard: {
        width: "100%",
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    leftPlayerCardContent: {
        width: "70%",
    },
    scoresView: {
        flexDirection: "row",
        gap: 8,
        minHeight: 20, 
        flexWrap: 'wrap',
    },
    rightPlayerCardContent: {
        width: "30%",
        paddingLeft: 12
    },
    addScoreView: {
        flexDirection: "row",
        alignItems: "center",
    },
    toseButton: {
        backgroundColor: Colors.orange500,
        width: "20%",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
})