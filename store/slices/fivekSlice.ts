import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface playerState {
    id: string,
    name: string,
    toseCount: number
}

interface turn {
    id: string,
    playerId: string,
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
            state.players.map(player => player.toseCount = 0)
        },
        addPlayer: (state, action: PayloadAction<string>) => {
            state.players.push({id: Date.now().toString(), name: action.payload, toseCount: 0})
        },
        addTurn: (state, action: PayloadAction<turn>) => {
            state.turns.push(action.payload)
            
            // Check Tose count
            
            action.payload.score == 0 ? state.players.find(player => player.id == action.payload.playerId)!.toseCount += 1 : state.players.find(player => player.id == action.payload.playerId)!.toseCount = 0

            let totalScore = state.turns.filter(turn => turn.playerId == action.payload.playerId).reduce((acc, turn) => acc + turn.score, 0)
            if (state.players.find(player => player.id == action.payload.playerId)!.toseCount == 3) {
                if (totalScore > 500) {
                    state.turns.push({id: Date.now().toString(), playerId: action.payload.playerId, score: -500})
                } else {
                    state.turns.push({id: Date.now().toString(), playerId: action.payload.playerId, score: -totalScore})
                }
                state.players.find(player => player.id == action.payload.playerId)!.toseCount = 0
            }

            // Check equal socres

            let repeat = true;
            while (repeat) {
                repeat = false;
                
                const totalScores = new Map<string, number>();
                for (const turn of state.turns) {
                    totalScores.set(turn.playerId, (totalScores.get(turn.playerId) || 0) + turn.score);
                }

                const scoreToPlayers = new Map<number, string[]>();
                for (const [player, score] of totalScores.entries()) {
                    if (!scoreToPlayers.has(score)) {
                        scoreToPlayers.set(score, []);
                    }
                    scoreToPlayers.get(score)!.push(player);
                }

                const playersToAdjust = new Map<string, number>();
                for (const [score, players] of scoreToPlayers.entries()) {
                    if (players.length > 1 && score > 0) {
                        players.forEach(player => {
                            if (player !== action.payload.playerId) {
                                for (let i = state.turns.length - 1; i >= 0; i--) {
                                    if (state.turns[i].playerId === player) {
                                        playersToAdjust.set(player, -state.turns[i].score);
                                        break;
                                    }
                                }
                            }
                        });
                    }
                }

                for (const [player, score] of playersToAdjust.entries()) {
                    state.turns.push({id: Date.now().toString(), playerId: player, score });
                    repeat = true;
                }
            }

        },
        cancelLastTurn: (state) => {
            let lastTurn = state.turns[state.turns.length - 1]
            lastTurn.score == 0 && state.players.find(player => player.id == lastTurn.playerId)!.toseCount--
            state.turns.pop()!
            console.log(state.players)
        }
    }
})

export const { addPlayer, addTurn, resetGame, cancelLastTurn, resetScore } = fivekSlice.actions
export default fivekSlice.reducer