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

const ListsSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        resetList: (state) => {
            state.lists = []
        },
        addList: (state, action: PayloadAction<string>) => {
            state.lists.push({name: action.payload})
        },
        editList: (state, action: PayloadAction<{ listToEdit: string; editedList: string }>) => {
            state.lists = state.lists.map((item: ListState) => {
                return (
                  item.name == action.payload.listToEdit ? {name: action.payload.editedList} : item
                )
              })
        },
        removeList: (state, action: PayloadAction<string>) => {
            state.lists = state.lists.filter((list: ListState) => {
                return list.name !== action.payload;
            });
        },
    }
})

export const { addList, editList, removeList, resetList } = ListsSlice.actions
export default ListsSlice.reducer