import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NotesState {
    notes: Note[];
}

const initialState: NotesState = {
    notes: [],
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetNotes: (state) => {
            state.notes = [];
        },
        addNote: (state) => {
            const newNote: Note = {
                id: Date.now().toString(),
                title: "New Note",
                content: "Add your content here",
            };
            state.notes.push(newNote);
        },
        updateNote: (state, action: PayloadAction<{ id: string; title: string; content: string }>) => {
            const noteIndex = state.notes.findIndex(note => note.id === action.payload.id);
            if (noteIndex !== -1) {
                state.notes[noteIndex].title = action.payload.title;
                state.notes[noteIndex].content = action.payload.content;
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    },
});

export const { addNote, updateNote, deleteNote, resetNotes } = noteSlice.actions;
export default noteSlice.reducer;