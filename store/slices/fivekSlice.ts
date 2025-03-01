import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface playerState {
    name: string,
    toseCount: number
}

interface turn {
    player: string,
    score: number,
}

interface State {
    players: playerState[],
    turns: turn[]
}

const initialState: State = {
    players: [],
    turns: []
}

export const fivekSlice = createSlice({
    name: 'fivek',
    initialState,
    reducers: {
        resetGame: () => {
            return initialState
        },
        resetScore: (state) => {
            state.turns = []
        },
        addPlayer: (state, action: PayloadAction<string>) => {
            state.players.push({name: action.payload, toseCount: 0})
        },
        addTurn: (state, action: PayloadAction<turn>) => {
            state.turns.push(action.payload)
            
            // Check Tose count
            
            action.payload.score == 0 ? state.players.find(player => player.name == action.payload.player)!.toseCount += 1 : state.players.find(player => player.name == action.payload.player)!.toseCount = 0

            let totalScore = state.turns.filter(turn => turn.player == action.payload.player).reduce((acc, turn) => acc + turn.score, 0)
            if (state.players.find(player => player.name == action.payload.player)!.toseCount == 3) {
                if (totalScore > 500) {
                    state.turns.push({player: action.payload.player, score: -500})
                } else {
                    state.turns.push({player: action.payload.player, score: -totalScore})
                }
                state.players.find(player => player.name == action.payload.player)!.toseCount = 0
            }

            // Check equal socres

            let summedScore = Object.values(
                state.turns.reduce((acc, { player, score }) => {
                  if (!acc[player]) {
                    acc[player] = { player, score: 0 };
                  }
                  acc[player].score += score;
                  return acc;
                }, {} as Record<string, turn>)
            );
            console.log("summedScore", summedScore)

            let currentMovingPlayer = summedScore.find(player => player.player == action.payload.player)

            const removeLastScoreFromPlayer = (player: string) => {
                let turnToRemove = state.turns.findLastIndex(turn => turn.player == player && turn.score != 9)
                state.turns.splice(turnToRemove, 1)

            }
            
            // summedScore.forEach((player: turn) => {
            //     if (player.player != currentMovingPlayer?.player && player.score != 0 && player.score != currentMovingPlayer?.score) {
            //         console.log("returned")
            //         return
            //     } else {
            //         console.log("action")
            //         removeLastScoreFromPlayer(player.player)
            //         // currentMovingPlayer = player
            //     }
            // })

        },
        cancelLastTurn: (state) => {
            let lastTurn = state.turns[state.turns.length - 1]
            lastTurn.score == 0 && state.players.find(player => player.name == lastTurn.player)!.toseCount--
            state.turns.pop()!
            console.log(state.players)
        }
    }
})

export const { addPlayer, addTurn, resetGame, cancelLastTurn, resetScore } = fivekSlice.actions
export default fivekSlice.reducer