export const DIV_IDS = {
    contacts: 'contacts',
    priceCalculationData: 'priceCalculationData',
    priceCalculationResult: 'priceCalculationResult',
    howToBook: 'how-to-book',
    aboutUs: 'about-us',
    faq: 'friguently-asked-questions',
}

export const ANIMATION_TIME = 2;
export const ANIMATION_TIME_SHORT = 1;
export const ANIMATION_TIME_SUPER_SHORT = 0.3;
export const HOVER_VALUE = 1.2;

export const bookTourSendStatusEnum = {
    notSent: "NOT_SENT",
    delivered: "DELIVERED",
    error: "ERROR"
} 
export type BookTourSendStatusType = 
    typeof bookTourSendStatusEnum.notSent |
    typeof bookTourSendStatusEnum.delivered |
    typeof bookTourSendStatusEnum.error

export type AppSliceInitialStateType = {
    isMobileMenuOpen: boolean,
    whichSubMenuPointOpen: string,
    isBookTourShow: boolean,
    bookTourSendStatus: BookTourSendStatusType,
}
export const appSliceInitialContent: AppSliceInitialStateType = {
    isMobileMenuOpen: false,
    whichSubMenuPointOpen: '',
    isBookTourShow: false,
    bookTourSendStatus: bookTourSendStatusEnum.notSent
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

export const TOUR_DAYS_PLAN_ANIMATION = {
    delay: 0.3,
    time: 0.7,
}
