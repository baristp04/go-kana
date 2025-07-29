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
        },
        reset: (state) => {
            state.streak = 0;
        },
        setStreak: (state, action: PayloadAction<number>) => {
            state.streak = action.payload;
        },
    },
})

export const { increment, reset, setStreak } = userSlice.actions;
export default userSlice.reducer;





