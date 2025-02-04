import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ListState {
    name: string
}

interface State {
    lists: ListState[];
}

const initialState: State = {
    lists: []
}

const ListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<string>) => {
            state.lists.push({name: action.payload})
        },
        editList: (state, action: PayloadAction<{ listToEdit: string; editedList: string }>) => {

        },
        removeList: (state, action: PayloadAction<string>) => {
            state.lists = state.lists.filter((list: ListState) => {
                return list.name !== action.payload;
            });
        },
    }
})

export const { addList, editList, removeList } = ListSlice.actions
export default ListSlice.reducer