import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart_redux';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer,} from 'redux-persist'

const persistConfig = {
    key: 'Tatlub',
    storage: storage,
    blacklist: ['searchFilterStore', 'storedData'],
}

const reducers = combineReducers({
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

