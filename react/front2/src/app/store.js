import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // key for storage
  storage, // use localStorage to persist state
};

const rootReducer = combineReducers({
  counter: counterSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// export { store, persistor };
