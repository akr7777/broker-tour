import i18next from "i18next"
import { LINE_DEVIDER, TOURS_IDS } from "./consts"
import { PATHS } from "../widgets/nav-menu/nav-paths"

import t1Icon from '../assets/icons/main-page.png'
import t2Icon from '../assets/icons/main-page.png'
import t3Icon from '../assets/icons/main-page.png'
import t4Icon from '../assets/icons/main-page.png'
import { tourMainPhotos } from "./tour-days-photos"
import { ReactNode } from "react"


export type PlanDayType = {
    dayNumber: number,
    dayContent: Array<string>
}
export type AdultPriceType = {
    personsCount: number,
    oneAdultPrice: number,
}
export type PriceAdditionalInfoType = {
    divCount: number,
    info1: string,
    info2: string,
}
export type HotelRecomendationType = {
    point: string,
    hotels: Array<string>,
}
export type TourType = {
    id: number,
    title: string,
    description: string,
    fullDescription: string,
    minPrice: number,
    plan: Array<PlanDayType>,
    adultPrice: Array<AdultPriceType>,
    childAbsDiscount: number,
    urlPath: string,
    daysCount: number,
    tourImage: ReactNode,
    tourIcon: string,
    hotelRecomendations: Array<HotelRecomendationType>
}

type TourPlanCreatorType = {days: number, tourI18n: string}
const tourPlanCreator = (props: TourPlanCreatorType):Array<PlanDayType> => {
    const tour1PlanResult: Array<PlanDayType> = []
    for (let i=1; i<=props.days; i++) {
        tour1PlanResult.push({
            dayNumber: i, 
            dayContent: i18next.t(props.tourI18n +'.plan.day' + i) 
                    ? i18next.t(props.tourI18n+'.plan.day' + i).split(LINE_DEVIDER) 
                    : []
        })
    }
    return tour1PlanResult
}


export const toursContent = ():Array<TourType> => [
    
    // TOUR 4 days
    {
        // TOUR 4 days
        id: TOURS_IDS.tour_4_days,
        urlPath: PATHS.tourInfo + '/' + TOURS_IDS.tour_4_days + '/',
        title: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.title'),
        tourImage: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_4_days)?.photo || "",
        tourIcon: t3Icon,
        description: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.description'),
        fullDescription: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.full-description'),
        daysCount: Number(i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.days-count')),
        minPrice: 570,
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.days-count')),
            tourI18n: 'tours.tour' + TOURS_IDS.tour_4_days
        }),
        adultPrice: [
            {
                personsCount: 1,
                oneAdultPrice: 2270,
            },
            {
                personsCount: 2,
                oneAdultPrice: 1390,
            },
            {
                personsCount: 3,
                oneAdultPrice: 1090,
            },
            {
                personsCount: 4,
                oneAdultPrice: 950,
            },
            {
                personsCount: 5,
                oneAdultPrice: 1090,
            },
            {
                personsCount: 6,
                oneAdultPrice: 990,
            },
            {
                personsCount: 7,
                oneAdultPrice: 950,
            },
            {
                personsCount: 8,
                oneAdultPrice: 890,
            },
        ],
        childAbsDiscount: 90,
        hotelRecomendations: [
            {
                point: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.hotels.hotel1'),
                hotels: ["Marriot Hacienda Belen", "Holiday Inn Express San Jose Costa Rica Airport", "Barcelo San Jose"]
            },
            {
                point: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.hotels.hotel2'),
                hotels: ["Tabacon Thermar resort and SPA", "Los Lagos hotel Spa and Resort", "Casa Luna hotel and SPA"]
            }
         ]
        
    },


    // TOUR 7 days
    {
        // TOUR 7 days
        id: TOURS_IDS.tour_7_days,
        urlPath: PATHS.tourInfo + '/' + TOURS_IDS.tour_7_days + '/',
        tourImage: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_7_days)?.photo || "",
        tourIcon: t1Icon,
        daysCount: Number(i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.days-count')),
        title: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.title'),
        description: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.description'),
        fullDescription: i18next.t('tours.tour' + TOURS_IDS.tour_7_days + '.full-description'),
        minPrice: 690,
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.days-count')),
            tourI18n: 'tours.tour' + TOURS_IDS.tour_7_days
        }),
        adultPrice: [
            {
                personsCount: 1,
                oneAdultPrice: 1950,
            },
            {
                personsCount: 2,
                oneAdultPrice: 1190,
            },
            {
                personsCount: 3,
                oneAdultPrice: 990,
            },
            {
                personsCount: 4,
                oneAdultPrice: 790,
            },
            {
                personsCount: 5,
                oneAdultPrice: 850,
            },
            {
                personsCount: 6,
                oneAdultPrice: 790,
            },
            {
                personsCount: 7,
                oneAdultPrice: 730,
            },
            {
                personsCount: 8,
                oneAdultPrice: 690,
            },
        ],
        childAbsDiscount: 70,
        hotelRecomendations: [
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.hotels.hotel1'),
                hotels: ["Hotel Makanda by the Sea", "Tulemar resort Costa Rica", "Karahe beach front"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.hotels.hotel2'),
                hotels: ["Tabacon Thermar resort and SPA", "Los Lagos hotel Spa and Resort", "Casa Luna hotel and SPA"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.hotels.hotel3'),
                hotels: ["Marriot Hacienda Belen", "Holiday Inn Express San Jose Costa Rica Airport", "Barcelo San Jose"]
            }
   
        ]   
    },

    // TOUR 9 days
    {
        // TOUR 9 days
        id: TOURS_IDS.tour_9_days,
        urlPath: PATHS.tourInfo + '/'+TOURS_IDS.tour_9_days+'/',
        title: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.title'),
        tourImage: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_9_days)?.photo || "",
        tourIcon: t4Icon,
        description: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.description'),
        fullDescription: i18next.t('tours.tour' + TOURS_IDS.tour_9_days + '.full-description'),
        daysCount: Number(i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.days-count')),
        minPrice: 890,
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.days-count')),
            tourI18n: 'tours.tour' + TOURS_IDS.tour_9_days
        }),
        adultPrice: [
            {
                personsCount: 1,
                oneAdultPrice: 2270,
            },
            {
                personsCount: 2,
                oneAdultPrice: 1390,
            },
            {
                personsCount: 3,
                oneAdultPrice: 1090,
            },
            {
                personsCount: 4,
                oneAdultPrice: 950,
            },
            {
                personsCount: 5,
                oneAdultPrice: 1090,
            },
            {
                personsCount: 6,
                oneAdultPrice: 990,
            },
            {
                personsCount: 7,
                oneAdultPrice: 950,
            },
            {
                personsCount: 8,
                oneAdultPrice: 890,
            },
        ],
        childAbsDiscount: 90,
        hotelRecomendations: [
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel1'),
                hotels: ["Marriot Hacienda Belen", "Holiday Inn Express San Jose Costa Rica Airport", "Barcelo San Jose"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel2'),
                hotels: ["Tabacon Thermar resort and SPA", "Los Lagos hotel Spa and Resort", "Casa Luna hotel and SPA"]

            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel3'),
                hotels: ["Hotel Makanda by the Sea","Tulemar resort Costa Rica", "Karahe beach front"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel4'),
                hotels: ["Hotel Makanda by the Sea", "Tulemar resort Costa Rica", "Karahe beach front"]
            }
        ],
    },

    // TOUR 12 days
    {
        // TOUR 12 days
        id: TOURS_IDS.tour_12_days,
        urlPath: PATHS.tourInfo + '/'+TOURS_IDS.tour_12_days+'/',
        tourImage: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_12_days)?.photo || "",
        tourIcon: t2Icon,
        title: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.title'),
        description: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.description'),
        fullDescription: i18next.t('tours.tour' + TOURS_IDS.tour_12_days + '.full-description'),
        minPrice: 690,
        daysCount: Number(i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.days-count')),
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.days-count')),
            tourI18n: 'tours.tour' + TOURS_IDS.tour_12_days
        }),
        adultPrice: [
            {
                personsCount: 1,
                oneAdultPrice: 3350,
            },
            {
                personsCount: 2,
                oneAdultPrice: 1900,
            },
            {
                personsCount: 3,
                oneAdultPrice: 1200,
            },
            {
                personsCount: 4,
                oneAdultPrice: 1150,
            },
            {
                personsCount: 5,
                oneAdultPrice: 1350,
            },
            {
                personsCount: 6,
                oneAdultPrice: 1187,
            },
            {
                personsCount: 7,
                oneAdultPrice: 1100,
            },
            {
                personsCount: 8,
                oneAdultPrice: 990,
            },
        ],
        childAbsDiscount: 80,
        hotelRecomendations: [
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel1'),
                hotels: ["Hotel Makanda by the Sea","Tulemar resort Costa Rica", "Karahe beach front"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel2'),
                hotels: ["Tabacon Thermar resort and SPA", "Los Lagos hotel Spa and Resort", "Casa Luna hotel and SPA"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel3'),
                hotels: ["Aguas Claras", "Umami Hotel - Adults Only", "Relax Natural Village Adults Only", "Villas del Caribe", "Le Cameleon Boutique Hotel"]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel4'),
                hotels: ["Marriot Hacienda Belen", "Holiday Inn Express San Jose Costa Rica Airport", "Barcelo San Jose"]
            }
        ]
    },
]