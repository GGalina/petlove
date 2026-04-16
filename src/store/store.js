import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageImport from "redux-persist/lib/storage";

import { authReducer } from "@/store/auth";
import favoritesReducer from "./favoritesSlice";

const storage = storageImport.default;

// ✅ persist auth state
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

// ✅ persist only favorite ids
const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["ids"],
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    favorites: persistedFavoritesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;