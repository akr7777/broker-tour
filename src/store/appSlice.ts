import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppSliceInitialStateType, BookTourSendStatusType, appSliceInitialContent } from './consts'

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
        setIsBookTourShow: (state: AppSliceInitialStateType, action: PayloadAction<boolean>) => {
            state.isBookTourShow = action.payload
        },
        setBookTourSendStatusAC: (state: AppSliceInitialStateType, action: PayloadAction<BookTourSendStatusType>) => {
            state.bookTourSendStatus = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    setIsMobileMenuOpen,
    setWhichSubMenuPointOpen,
    setIsBookTourShow, setBookTourSendStatusAC, 
} = appSlice.actions

export default appSlice.reducer
// export const statisticsReducer = appSlice.reducer
