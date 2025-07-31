import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    user: any;
    userName: string,
    isLoading: boolean;
    isRegistering: boolean;
}

const initialState: authState = {
    user : null,
    userName: "",
    isLoading : true,
    isRegistering : false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setUserName:(state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setIsRegistering: (state, action: PayloadAction<boolean>) => {
            state.isRegistering = action.payload
        },
        resetAuthState: (state) => {
            state.user = null,
            state.isLoading = true,
            state.isRegistering = false
        }
    }
})

export const {setUser,setUserName,setLoading,setIsRegistering,resetAuthState} = authSlice.actions;
export default authSlice.reducer;
