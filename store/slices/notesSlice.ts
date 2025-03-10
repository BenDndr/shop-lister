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
        addNote: (state, action: PayloadAction<{ title: string; content: string }>) => {
            const newNote: Note = {
                id: Date.now().toString(),
                title: action.payload.title,
                content: action.payload.content,
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