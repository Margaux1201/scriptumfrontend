import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    pseudo: string | null;
    token: string | null;
}

const initialState: UserState = {
    pseudo: null,
    token: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ pseudo: string; token: string }>) => {
            state.pseudo = action.payload.pseudo;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.pseudo = null;
            state.token = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;