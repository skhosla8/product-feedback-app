import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { feedbackSlice } from './slices/feedbackSlice';

export const makeStore = () =>
    configureStore({
        reducer: {
            feedback: feedbackSlice.reducer,
        },
        devTools: true,
    });

type Store = ReturnType<typeof makeStore>;

export type RootState = ReturnType<Store['getState']>;
export const wrapper = createWrapper(makeStore);

