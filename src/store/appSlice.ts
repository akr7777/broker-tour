import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppSliceInitialStateType, appSliceInitialContent } from './consts'

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: appSliceInitialContent,
    reducers: {
        setIsMobileMenuOpen: (state: AppSliceInitialStateType, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload
        },
        setWhichSubMenuPointOpen: (state: AppSliceInitialStateType, action: PayloadAction<string>) => {
            state.whichSubMenuPointOpen = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    setIsMobileMenuOpen,
    setWhichSubMenuPointOpen
} = appSlice.actions

export default appSlice.reducer
// export const statisticsReducer = appSlice.reducer
