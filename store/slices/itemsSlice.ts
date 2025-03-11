import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
  id: string;
  name: string;
  listId: string;
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
    resetItems: () => {
      return initialState;
    },
    addItem: (state, action: PayloadAction<{name: string, listId: string}>) => {
      state.items.push({ name: action.payload.name, listId: action.payload.listId, id: Date.now().toString() });
    },
    removeSpecificItem: (state, action: PayloadAction<string>) => {
      let item = state.items.find((item: ItemsState) => {
        return item.id == action.payload;
      })
      state.items = state.items.filter((item: ItemsState) => {
        return item.id !== action.payload;
      });
      if (state.discardedItems.length > 9) {
        state.discardedItems.shift()!
      }
      state.discardedItems.push(item!)
    },
    restoreLastDiscardedItem: (state) => {
      if (state.discardedItems.length == 0) {
        console.log("No items to restore")
      } else {
        state.items.push(state.discardedItems.pop()!);
      }
    },
    removeByList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: ItemsState) => {
        return item.listId != action.payload
      })
      state.discardedItems = state.discardedItems.filter((item: ItemsState) => {
        return item.listId != action.payload
      })
    },
    editItem: (state, action: PayloadAction<{ itemIdToEdit: string; editedItem: string }>) => {
      state.items = state.items.map((item: ItemsState) => {
        return (
          item.id == action.payload.itemIdToEdit ? {...item, name: action.payload.editedItem} : item
        )
      })
    },
  },
})

export const { addItem, resetItems, removeSpecificItem, restoreLastDiscardedItem, removeByList, editItem } = itemsSlice.actions
export default itemsSlice.reducer