export const DIV_ID_CONTACTS = 'contacts'

export const ANIMATION_TIME = 2;
export const ANIMATION_TIME_SHORT = 1;
export const ANIMATION_TIME_SUPER_SHORT = 0.3;
export const HOVER_VALUE = 1.2;


export type AppSliceInitialStateType = {
    isMobileMenuOpen: boolean,
    whichSubMenuPointOpen: string,
}
export const appSliceInitialContent: AppSliceInitialStateType = {
    isMobileMenuOpen: false,
    whichSubMenuPointOpen: '',
}

export const LINE_DEVIDER = '\n'

export const CONTACTS = {
    phoneOlga: '+50689122090',
    phoneDavid: '+50689122044',
    email: 'oldagatour@gmail.com'
}

export const TOURS_IDS = {
    tour_4_days: 1,
    tour_7_days: 2,
    tour_9_days: 3,
    tour_12_days: 4,
}