import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToAsyncStorage } from "../AsyncStorage";

interface userState {
    streak: number;
}

const initialState: userState = {
    streak: 0,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.streak += 1;
            saveToAsyncStorage("user",state.streak)
        },
        reset: (state) => {
            state.streak = 0;
            saveToAsyncStorage("user",state.streak)
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.streak = action.payload;
            saveToAsyncStorage("user",state.streak)
        },
    },
})

export const { increment, reset, setCounter } = userSlice.actions;
export default userSlice.reducer;



