import { useState, useEffect, useRef } from "react"
import {View, StyleSheet, FlatList, TouchableOpacity, TextInput} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomInput } from "@/components/CustomInput"
import { CustomButton } from "@/components/CustomButton"
import { ErrorMessage } from "@/components/ErrorMessage"
import { ModalLayout } from "@/components/ModalLayout"
import { useRouter } from "expo-router"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addPlayer, resetGame, addTurn, cancelLastTurn } from '@/store/slices/fivekSlice'
import { Audio } from "expo-av";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
export default function FiveThousand() {

    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)
    const [activePlayer, setActivePlayer] = useState("")
    const [newPlayer, setNewPlayer] = useState("")
    const dispatch = useAppDispatch()
    const [newScore, setNewScore] = useState("")
    const [errorMessageVisible, setErrorMessageVisible] = useState(false)
    const [newGameModalVisible, setNewGameModalVisible] = useState(false)

    console.log("fivek", fivek)
    console.log("players", fivek.players)
    console.log("turns", fivek.turns)

    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const playSound = async () => {
        try {
        const { sound } = await Audio.Sound.createAsync(
            require("@/assets/sounds/fart.wav")
        );
        setSound(sound);
        await sound.playAsync();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    useEffect(() => {
        if (fivek.players.length > 0) {
            setActivePlayer(fivek.players[0].name)
        }
    }, [fivek.players])

    const createPlayer = () => {
        if (newPlayer == "" || fivek.players.find(player => player.name == newPlayer)) {
            setErrorMessageVisible(true)
            return
        }
        dispatch(addPlayer(newPlayer))
        setActivePlayer(newPlayer)
        setNewPlayer("")
    }

    const addTose = (playerName: string) => {
        dispatch(addTurn({player: playerName, score: 0}))
        playSound()
    }

    const enterScore = () => {
        fivek.players.length > 0 && dispatch(addTurn({player: activePlayer, score: parseInt(newScore)}))
        setNewScore("")
    }

    const startNewGame = () => {
        dispatch(resetGame())
        setNewGameModalVisible(false)
        setActivePlayer("")
    }

    const playerView = ({ item } : {item: { name: string }}) => {

        const Score = fivek.turns.filter(turn => turn.player == item.name).reduce((acc, turn) => acc + turn.score, 0)

        return (
            <TouchableOpacity style={[styles.playerCard, {backgroundColor: item.name == activePlayer ? Colors.yellow300 : Colors.backGround}]} onPress={() => setActivePlayer(item.name)}>
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
            {
                newGameModalVisible &&
                <ModalLayout heightProps={200} closeModal={() => setNewGameModalVisible(false)}>
                    <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Voulez-vous lancer une nouvelle partie ?</ThemedText>
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.orange300, color2: Colors.orange100}} text={"Yes"} onPress={startNewGame}/>
                    <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.blue300, color2: Colors.blue100}} text={"No"} onPress={() => setNewGameModalVisible(false)}/>

                </ModalLayout>
            }
            <View style={styles.content}>
                <View style={styles.header}>
                    <ThemedText type="title">5K</ThemedText>
                </View>
                <View style={styles.body}>
                    <ErrorMessage
                        visible={errorMessageVisible}
                        hideAction={() => setErrorMessageVisible(false)}
                        content={`${newPlayer} is already playing !`}
                        height={-50}
                    />
                    <View style={styles.addScoreView}>
                        <CustomInput 
                            placeholder={activePlayer != "" ? `Add score to ${activePlayer}` : "Add player to start playing !"} 
                            value={newScore} 
                            onChangeText={(e) => setNewScore(e)} 
                            keyboardType='numeric'
                            style={{width: "80%", height: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                            validate={() => enterScore()}
                        />
                        
                        <TouchableOpacity onPress={() => addTose(activePlayer)} style={styles.toseButton}>
                            <ThemedText>Tose</ThemedText>
                        </TouchableOpacity>    
                    </View>
                    <FlatList 
                        data={fivek.players}
                        renderItem={playerView}
                        keyExtractor={(item) => item.name}
                        style={{paddingBottom: 16}}
                    />
                    <View style={{marginTop: "auto", paddingTop: 16}}>
                        <CustomInput placeholder="Enter new player's name" value={newPlayer} onChangeText={(e) => setNewPlayer(e)} validate={createPlayer}/>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <CustomButton hapticFeel lightText color={{color1: Colors.pink500, color2: Colors.pink700}} text={"New Game"} onPress={() => setNewGameModalVisible(true)} style={{width: "32%"}}/>
                            <CustomButton hapticFeel lightText color={{color1: Colors.orange500, color2: Colors.orange700}} onPress={() => dispatch(cancelLastTurn())} style={{width: "32%"}}>
                                <FontAwesomeIcon icon={faRotateLeft} color="white"/>
                            </CustomButton>
                            <CustomButton hapticFeel lightText color={{color1: Colors.blue500, color2: Colors.blue700}} text={"Go back"} onPress={() => router.push("/extra")} style={{width: "32%"}}/> 
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