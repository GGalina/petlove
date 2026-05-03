import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageImport from "redux-persist/lib/storage";

import { authReducer } from "@/store/auth";
import favoritesReducer from "./favoritesSlice";
import viewedReducer from "./viewedSlice";
import petsReducer from "./petsSlice";

const storage = storageImport.default;

// =========================
// AUTH PERSIST
// =========================
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["ids"],
};

const viewedPersistConfig = {
  key: "viewed",
  storage,
  whitelist: ["items"],
};

const petsPersistConfig = {
  key: "pets",
  storage,
  whitelist: ["items"],
};

// =========================
// PERSISTED REDUCERS
// =========================
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedViewedReducer = persistReducer(viewedPersistConfig, viewedReducer);
const persistedPetsReducer = persistReducer(petsPersistConfig, petsReducer);

// =========================
// STORE
// =========================
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    favorites: persistedFavoritesReducer,
    viewed: persistedViewedReducer,
    pets: persistedPetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// =========================
export const persistor = persistStore(store);

export default store;