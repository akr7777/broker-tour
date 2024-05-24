export const DIV_ID_CONTACTS = 'contacts'

export const ANIMATION_TIME = 2;
export const ANIMATION_TIME_SHORT = 1;
export const HOVER_VALUE = 1.2;


export type AppSliceInitialStateType = {
    isMobileMenuOpen: boolean,
    whichSubMenuPointOpen: string,
}
export const appSliceInitialContent: AppSliceInitialStateType = {
    isMobileMenuOpen: false,
    whichSubMenuPointOpen: '',
}