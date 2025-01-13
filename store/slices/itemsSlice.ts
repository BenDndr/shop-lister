import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ItemsState = Record<string, any>
  
const initialState: ItemsState = {
    items: []
};

export const itemsSlice = createSlice({
  name: 'Bill',
  initialState,
  reducers: {
    addItem: (state) => {
        state.push({ name: "bread" });
    },
    resetItems: (state) => {
        return [];
    }
  },
})

export const { addItem, resetItems } = itemsSlice.actions
export default itemsSlice.reducer