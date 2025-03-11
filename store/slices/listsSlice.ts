import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListState {
    id: string
    name: string
}

interface State {
    lists: ListState[];
}

const initialState: State = {
    lists: []
}

const ListsSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        resetList: (state) => {
            state.lists = []
        },
        addList: (state, action: PayloadAction<string>) => {
            state.lists.push({name: action.payload, id: Date.now().toString()})
        },
        editList: (state, action: PayloadAction<{ id: string; newName: string }>) => {
            state.lists = state.lists.map((list: ListState) => {
                return (
                    list.id == action.payload.id ? {...list, name: action.payload.newName} : list
                )
            })
        },
        removeList: (state, action: PayloadAction<string>) => {
            state.lists = state.lists.filter((list: ListState) =>  list.id !== action.payload);
        },
    }
})

export const { addList, editList, removeList, resetList } = ListsSlice.actions
export default ListsSlice.reducer