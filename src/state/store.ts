import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setCounter} from "./user/userSlice";
import { loadFromAsyncStorage } from "./AsyncStorage";
import authReducer, {setUserName}  from "./auth/authSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
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
    const counterValue = await loadFromAsyncStorage("user");
    const userName = await loadFromAsyncStorage("auth")
    store.dispatch(setCounter(counterValue));
    store.dispatch(setUserName(userName));
}

initializeStore();

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;