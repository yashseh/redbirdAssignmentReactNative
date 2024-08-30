import { configureStore, Store } from '@reduxjs/toolkit';

import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';

//persist configuration
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

//root reducer with persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store creation
const store: Store = configureStore({
    reducer: persistedReducer,
    middleware: (gdm) =>
        gdm({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

//store persistor
const persistor = persistStore(store);

const exportObj = {
    store,
    persistor
};

export default exportObj;

//root state type definition
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = any;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
