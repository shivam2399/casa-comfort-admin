import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from './productSlice'
import orderReducer from './orderSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'orders']
}

const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)


export default store;