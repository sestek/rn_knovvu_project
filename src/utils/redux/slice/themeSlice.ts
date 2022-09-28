import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
    color_100: string,
    color_200: string,
    color_300: string,
    color_400: string,
    background_100: string,
    background_200: string,
    color: string
}

const initialState: ThemeState = {
    color_100: "#7f81ae",
    color_200: "#abaee6",
    color_300: "#ec008c",
    color_400: "#7D8088",
    background_100: "#181c2a",
    background_200: "white",
    color: "black",
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeColor: (state, action: PayloadAction<[string, string]>) => {
            state[action.payload[0]] = action.payload[1];
        },
    },
})

// Action creators are generated for each case reducer function
export const { setThemeColor } = themeSlice.actions

export default themeSlice.reducer