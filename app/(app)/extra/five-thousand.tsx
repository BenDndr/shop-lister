import { useState, useEffect, useRef } from "react"
import {View, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native"
import { Colors } from "@/constants/Colors"
import { PageContainer } from "@/components/PageContainer"
import { ThemedText } from "@/components/ThemedText"
import { CustomInput } from "@/components/CustomInput"
import { CustomButton } from "@/components/CustomButton"
import { ErrorMessage } from "@/components/ErrorMessage"
import { ModalLayout } from "@/components/ModalLayout"
import { FiveThousandRules } from "@/components/FiveThousandRules"
import { useRouter } from "expo-router"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addPlayer, resetGame, addTurn, cancelLastTurn, resetScore } from '@/store/slices/fivekSlice'
import { Audio } from "expo-av";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotateLeft, faDice, faPooStorm, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
export default function FiveThousand() {

    const router = useRouter()
    const fivek = useAppSelector(state => state.fivek)
    const [activePlayerId, setActivePlayerId] = useState("")
    const [newPlayer, setNewPlayer] = useState("")
    const dispatch = useAppDispatch()
    const [newScore, setNewScore] = useState("")
    const [errorMessageVisible, setErrorMessageVisible] = useState(false)
    const [cancelErrorMessageVisible, setCancelErrorMessageVisible] = useState(false)
    const [newGameModalVisible, setNewGameModalVisible] = useState(false)
    const [rulesModalVisible, setRulesModalVisible] = useState(false)
    const [addPlayerMode, setAddPlayerMode] = useState(true)

    const playSound = async () => {
        try {
            const sounds = [
                require("@/assets/sounds/fart.wav"),
                require("@/assets/sounds/fart2.mp3"),
                require("@/assets/sounds/fart3.wav")
            ];

            const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
            const { sound } = await Audio.Sound.createAsync(randomSound);
            await sound.playAsync();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const nextPlayer = () => {
        const players = fivek.players.map(player => player.id)
        if (fivek.players.length > 0) {
            if (activePlayerId == "") {
                setActivePlayerId(fivek.players[0].id)
            } else {
                let activePlayerIndex = players.indexOf(activePlayerId)
                setActivePlayerId(players[activePlayerIndex + 1] || players[0])
            }
        }
    }

    // useEffect(() => {
    //     fivek.players.length > 0 &&setActivePlayerId(fivek.players[fivek.players.length - 1].id)
    // }, [fivek.players])

    const createPlayer = () => {
        if (newPlayer == "" || fivek.players.find(player => player.name == newPlayer)) {
            setErrorMessageVisible(true)
            return
        }
        dispatch(addPlayer(newPlayer))
        setNewPlayer("")
    }

    const addTose = (playerId: string) => {
        if (playerId != "") {
            dispatch(addTurn({id: Date.now().toString(), playerId: playerId, score: 0}))
            playSound()
            nextPlayer()
        }
    }

    const enterScore = () => {
        fivek.players.length > 0 && dispatch(addTurn({id: Date.now().toString(), playerId: activePlayerId, score: parseInt(newScore)}))
        setNewScore("")
        nextPlayer()
    }

    const startNewGame = (hard: boolean = false) => {
        hard ? dispatch(resetGame()) : dispatch(resetScore())
        hard && setAddPlayerMode(true)
        setNewGameModalVisible(false)
        setActivePlayerId("")
    }

    const removeLastTurn = () => {
        if (fivek.turns.length > 0) {
            dispatch(cancelLastTurn())
        } else {
            setCancelErrorMessageVisible(true)
        }
    }

    const playerView = ({ item } : {item: { id: string, name: string }}) => {

        const Score = fivek.turns.filter(turn => turn.playerId == item.id).reduce((acc, turn) => acc + turn.score, 0)

        return (
            <TouchableOpacity style={[styles.playerCard, {backgroundColor: item.id == activePlayerId ? Colors.pink100 : Colors.backGround}]} onPress={() => setActivePlayerId(item.id)}>
                <FontAwesomeIcon icon={faDice} style={{position: "absolute", opacity: item.id == activePlayerId ? .3 : 0, left: 20}} size={64}/>
                <View style={styles.leftPlayerCardContent}>
                    <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                    <View style={styles.scoresView}>
                        {fivek.turns.filter(turn => turn.playerId == item.id).slice(-7).map((turn, index) => {
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
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            {
                newGameModalVisible &&
                <ModalLayout heightProps={260} closeModal={() => setNewGameModalVisible(false)}>
                    <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Voulez-vous lancer une nouvelle partie ?</ThemedText>
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.pink500, color2: Colors.pink300}} text={"Reset Scores"} onPress={startNewGame} lightText/>
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.pink500, color2: Colors.pink300}} text={"New Game"} onPress={() => startNewGame(true)} lightText/>
                    <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.teal500, color2: Colors.teal300}} text={"No"} onPress={() => setNewGameModalVisible(false)}/>

                </ModalLayout>
            }
            {
                rulesModalVisible &&
                <ModalLayout heightProps={600} closeModal={() => setRulesModalVisible(false)} topProp={150}>
                    <FiveThousandRules/>
                </ModalLayout>
            }
            <View style={styles.content}>
                <View style={styles.header}>
                    <ThemedText type="title">5000</ThemedText>
                    <TouchableOpacity style={{marginBottom: 12}} onPress={() => setRulesModalVisible(true)}>
                        <FontAwesomeIcon icon={faCircleQuestion} size={32} color={Colors.backGround}/>
                    </TouchableOpacity>
                </View>
                { addPlayerMode  ? 
                    <CustomInput placeholder="Enter new player's name" value={newPlayer} onChangeText={(e) => setNewPlayer(e)} validate={createPlayer} style={{height: 50}}/>
                    :
                    <View style={styles.addScoreView}>
                        <CustomInput 
                            placeholder={activePlayerId != "" ? `Add score to ${fivek.players.find(player => player.id == activePlayerId)?.name}` : "Add player to start playing !"}
                            value={newScore} 
                            onChangeText={(e) => setNewScore(e)} 
                            keyboardType='numeric'
                            style={{width: "80%", height: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                            validate={() => enterScore()}
                        />
                        
                        <TouchableOpacity onPress={() => addTose(activePlayerId)} style={styles.toseButton}>
                            <FontAwesomeIcon icon={faPooStorm} color={"white"} size={32}/>
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.body}>
                    <ErrorMessage
                        visible={errorMessageVisible}
                        hideAction={() => setErrorMessageVisible(false)}
                        content={`${newPlayer} is already playing !`}
                        height={-50}
                    />
                    <ErrorMessage
                        visible={cancelErrorMessageVisible}
                        hideAction={() => setCancelErrorMessageVisible(false)}
                        content={`No turn have been played yet !`}
                        height={-50}
                    />
                    
                    <FlatList 
                        data={fivek.players}
                        renderItem={playerView}
                        keyExtractor={(item) => item.id}
                        style={{paddingBottom: 16}}
                    />
                    <KeyboardAvoidingView 
                        style={styles.inputView}
                        behavior="padding"
                    >
                    
                    </KeyboardAvoidingView>
                    <View style={{marginTop: "auto", paddingBottom: 55}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <CustomButton hapticFeel lightText color={{color1: Colors.teal700, color2: Colors.teal500}} text={"New Game"} onPress={() => setNewGameModalVisible(true)} style={{width: "32%"}}/>
                            <CustomButton hapticFeel lightText color={{color1: addPlayerMode ? Colors.pink500 : Colors.teal700, color2: addPlayerMode ? Colors.pink700 : Colors.teal500}} text={addPlayerMode ? "Start playing" : "Add player"} onPress={() => setAddPlayerMode(!addPlayerMode)} style={{width: "32%"}}/>
                            <CustomButton hapticFeel lightText color={{color1: Colors.teal700, color2: Colors.teal500}} onPress={removeLastTurn} style={{width: "32%"}}>
                                <FontAwesomeIcon icon={faRotateLeft} color="white"/>
                            </CustomButton>
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
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end"
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
        height: "100%",
        borderRightWidth: 1,
        borderRightColor: Colors.blue900
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
    inputView: {
        paddingTop: 6,
    },
    addScoreView: {
        flexDirection: "row",
        alignItems: "center",
    },
    toseButton: {
        backgroundColor: Colors.teal700,
        width: "20%",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
})