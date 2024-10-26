import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import UserReducer from './reducers/UserReducer.jsx'
import PostReducer from "./reducers/PostReducer.jsx";
import CommentReducer from "./reducers/CommentReducer.jsx";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    user: UserReducer,
    post: PostReducer,
    comment: CommentReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export const clear = function() {
  persistor.purge()
}

export { store,persistor }