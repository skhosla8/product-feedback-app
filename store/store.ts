import {  combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import feedbackSlice  from './slices/feedbackSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    feedback: feedbackSlice
});

const persistConfig = {
    key: 'primary',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () =>
    configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false,
        }),
        devTools: true,
    });

type Store = ReturnType<typeof makeStore>;

export type RootState = ReturnType<Store['getState']>;
export const wrapper = createWrapper(makeStore);


