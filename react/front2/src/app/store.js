import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./features/todo/dummyData";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  [productApi.reducerPath]: productApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
