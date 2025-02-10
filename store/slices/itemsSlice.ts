import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
  name: string;
  list: string;
}

interface State {
  items: ItemsState[];
  discardedItems: ItemsState[];
}

const initialState: State = {
  items: [],
  discardedItems: []
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{name: string, list: string}>) => {
      state.items.push({ name: action.payload.name, list: action.payload.list });
    },
    removeSpecificItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: ItemsState) => {
        return item.name !== action.payload;
      });
    },
    removeByList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: ItemsState) => {
        item.list == action.payload
      })
    },
    editItem: (state, action: PayloadAction<{ itemToEdit: string; editedItem: string }>) => {
      state.items = state.items.map((item: ItemsState) => {
        return (
          item.name == action.payload.itemToEdit ? {...item, name: action.payload.editedItem} : item
        )
      })
    },
    resetItems: () => {
        return initialState;
    }
  },
})

export const { addItem, resetItems, removeSpecificItem, editItem } = itemsSlice.actions
export default itemsSlice.reducer