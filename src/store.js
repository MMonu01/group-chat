import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import SocketReducer from "~/reducers/socket-reducer";
import JoinReducer from "~/reducers/join-reducer";

const rootReducer = combineReducers({ socket_store: SocketReducer, join_store: JoinReducer });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["join_store"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
