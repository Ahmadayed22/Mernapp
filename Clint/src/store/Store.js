import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

//  const Store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// const persistor = persistStore(Store);
// export default { Store, persistor };


//way one without redux persist
import authReducer from "./auth";

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(Store);

export default Store;