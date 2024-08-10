import { useDispatch } from 'react-redux';
import wordsStatReducer from './reducers/wordsStat';
import { configureStore } from "@reduxjs/toolkit";


export const reduxStore = configureStore({
    reducer: {
        wordsStat: wordsStatReducer
    }
}) 

export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()