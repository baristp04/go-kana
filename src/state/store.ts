import { configureStore } from "@reduxjs/toolkit";
import { loadFromAsyncStorage } from "./AsyncStorage";
import authReducer, {setUserName}  from "./auth/authSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

const initializeStore = async () => {
    const userName = await loadFromAsyncStorage("auth")
    store.dispatch(setUserName(userName));
}

initializeStore();

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;