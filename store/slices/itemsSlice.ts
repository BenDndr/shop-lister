import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
  name: string;
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
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({ name: action.payload });
    },
    removeSpecificItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: ItemsState) => {
        return item.name !== action.payload; // Return true for items to keep
      });
    },
    resetItems: () => {
        return initialState;
    }
  },
})

export const { addItem, resetItems, removeSpecificItem } = itemsSlice.actions
export default itemsSlice.reducer