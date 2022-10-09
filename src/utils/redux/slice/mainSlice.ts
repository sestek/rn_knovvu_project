import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MainState {
    modalVisible: (() => void) | undefined;
}

const initialState: MainState = {
    modalVisible: undefined,
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setModalVisible: (state, action: PayloadAction<(() => void) | undefined>) => {
            state.modalVisible = action.payload;
        },
    },
})

export const { setModalVisible } = mainSlice.actions

export default mainSlice.reducer