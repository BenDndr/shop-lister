import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface playerState {
    name: string,
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
        addPlayer: (state, action: PayloadAction<string>) => {
            state.players.push({name: action.payload})
        },
        addTurn: (state, action: PayloadAction<turn>) => {
            state.turns.push(action.payload)
            let checkToseCount = state.turns.filter(turn => turn.player == action.payload.player && turn.score >= 0).slice(-3)
            let totalScore = state.turns.filter(turn => turn.player == action.payload.player).reduce((acc, turn) => acc + turn.score, 0)
            if (checkToseCount.reduce((acc, turn) => acc + turn.score, 0) == 0 && checkToseCount.length > 2) {
                if (totalScore > 500) {
                    state.turns.push({player: action.payload.player, score: -500})
                } else {
                    state.turns.push({player: action.payload.player, score: -totalScore})
                }
            }
        },
        cancelLastTurn: (state) => {
            state.turns.pop()!
        }
    }
})

export const { addPlayer, addTurn, resetGame, cancelLastTurn } = fivekSlice.actions
export default fivekSlice.reducer