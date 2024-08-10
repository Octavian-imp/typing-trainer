import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type WordsStat = {
    wordsPerMin: number;
    errors: number;
};

const initialState: WordsStat[] = [];

export const wordsStatSlice = createSlice({
    name: "wordsStat",
    initialState: {
        value: initialState,
    },
    reducers: {
        addResults: (state, action: PayloadAction<WordsStat>) => {
            state.value = [...state.value, action.payload];
        },
    },
});

export const selectWordsStat = (state: RootState) => state.wordsStat.value

export const { addResults } = wordsStatSlice.actions;

export default wordsStatSlice.reducer;
