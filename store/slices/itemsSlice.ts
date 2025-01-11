import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

// The elements of the state needs to be adapted to include the data you need
const initialState = {
  id: 0,
  name: "",
  quantity: 0,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    //TODO: The reducer needs to be adapted to include the data you need
    addItem: (state) => {
      state.id = 1
      state.name = "paté de mittens"
      state.quantity = 2
    }
  },
})

export const { addItem } = itemsSlice.actions
export default itemsSlice.reducer