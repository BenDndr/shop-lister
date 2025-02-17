import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface playerState {
    name: string,
}

interface turn {
    player: string,
    score: number,
    tose: boolean,
    toseStreak: number,
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
        reset: (state) => {
            state = initialState
        },
        addPlayer: (state, action: PayloadAction<string>) => {
            state.players.push({name: action.payload})
        },
        addTurn: (state, action: PayloadAction<turn>) => {
            state.turns.push(action.payload)
        }
    }
})

export const { addPlayer, addTurn } = fivekSlice.actions
export default fivekSlice.reducer