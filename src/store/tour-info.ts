import i18next from "i18next"
import { LINE_DEVIDER, TOURS_IDS } from "./consts"
import { PATHS } from "../widgets/nav-menu/nav-paths"

import t1Icon from '../assets/icons/menu/tours.png'
import t2Icon from '../assets/icons/menu/tours.png'
import t3Icon from '../assets/icons/menu/tours.png'
import t4Icon from '../assets/icons/menu/tours.png'
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
export type HotelType = {
    hotelId: string,
    title: string,
    link: string
}
export type HotelRecomendationType = {
    point: string,
    hotels: Array<HotelType | undefined>,
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
    tourImage: {
        img: ReactNode,
        url: string
    }
    tourIcon: string,
    hotelRecomendations: Array<HotelRecomendationType>
}

export const costaRicaHotels: Array<HotelType> = [
    {
        hotelId: '01',
        title: "Marriot Hacienda Belen",
        link: "https://www.marriott.com/en-us/hotels/sjocr-costa-rica-marriott-hotel-hacienda-belen/overview/",
    },
    {
        hotelId: '02',
        title: "Holiday Inn Express San Jose Costa Rica Airport",
        link: "https://www.ihg.com/holidayinnexpress/hotels/us/en/san-jose/sjoap/hoteldetail",
    },
    {
        hotelId: '03',
        title: "Barcelo San Jose",
        link: "https://www.barcelo.com/en-us/barcelo-san-jose/",
    },
    {
        hotelId: '04',
        title: "Tabacon Thermar resort and SPA",
        link: "https://www.tabacon.com/",
    },
    {
        hotelId: '05',
        title: "Los Lagos hotel Spa and Resort",
        link: "https://www.hotelloslagos.com/",
    },
    {
        hotelId: '06',
        title: "Casa Luna hotel and SPA",
        link: "https://casalunahotel.com/",
    },
    {
        hotelId: '07',
        title: "Hotel Makanda by the Sea",
        link: "https://makanda.com/",
    },
    {
        hotelId: '08',
        title: "Tulemar resort Costa Rica",
        link: "https://tulemar.com/",
    },
    {
        hotelId: '09',
        title: "Karahe beach front",
        link: "https://www.karahe.com/",
    },
    {
        hotelId: "10",
        title: "Aguas Claras",
        link: "https://www.hotelaguasclaras.com/"
    },
    {
        hotelId: "11",
        title: "Umami Hotel - Adults Only",
        link: "https://umamihotel.com/",
    },
    {
        hotelId: "12",
        title: "Relax Natural Village Adults Only",
        link: "https://www.relaxnaturalvillage.com/",
    },
    {
        hotelId: "13",
        title: "Villas del Caribe",
        link: "https://villasdelcaribe.com/en/home/",
    },
    {
        hotelId: "14",
        title: "Le Cameleon Boutique Hotel",
        link: "https://lecameleonhotel.com/",
    },
]

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
        tourImage: {
            img: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_4_days)?.photo || "",
            url: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_4_days)?.photoUrl || ""
        },
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
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '01'),
                    costaRicaHotels.find(h => h.hotelId === '02'),
                    costaRicaHotels.find(h => h.hotelId === '03'),
                ]
            },
            {
                point: i18next.t('tours.tour' + TOURS_IDS.tour_4_days + '.hotels.hotel2'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '04'),
                    costaRicaHotels.find(h => h.hotelId === '05'),
                    costaRicaHotels.find(h => h.hotelId === '06'),
                ]
            }
         ]
        
    },


    // TOUR 7 days
    {
        // TOUR 7 days
        id: TOURS_IDS.tour_7_days,
        urlPath: PATHS.tourInfo + '/' + TOURS_IDS.tour_7_days + '/',
        tourImage: {
            img: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_7_days)?.photo || "",
            url: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_7_days)?.photoUrl || "",
        },
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
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '07'),
                    costaRicaHotels.find(h => h.hotelId === '08'),
                    costaRicaHotels.find(h => h.hotelId === '09'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.hotels.hotel2'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '04'),
                    costaRicaHotels.find(h => h.hotelId === '05'),
                    costaRicaHotels.find(h => h.hotelId === '06'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_7_days+'.hotels.hotel3'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '01'),
                    costaRicaHotels.find(h => h.hotelId === '02'),
                    costaRicaHotels.find(h => h.hotelId === '03'),
                ]
            }
   
        ]   
    },

    // TOUR 9 days
    {
        // TOUR 9 days
        id: TOURS_IDS.tour_9_days,
        urlPath: PATHS.tourInfo + '/'+TOURS_IDS.tour_9_days+'/',
        title: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.title'),
        tourImage: {
            img: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_9_days)?.photo || "",
            url: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_9_days)?.photoUrl || "",
        },
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
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '01'),
                    costaRicaHotels.find(h => h.hotelId === '02'),
                    costaRicaHotels.find(h => h.hotelId === '03'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel2'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '04'),
                    costaRicaHotels.find(h => h.hotelId === '05'),
                    costaRicaHotels.find(h => h.hotelId === '06'),
                ]

            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel3'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '07'),
                    costaRicaHotels.find(h => h.hotelId === '08'),
                    costaRicaHotels.find(h => h.hotelId === '09'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_9_days+'.hotels.hotel4'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '07'),
                    costaRicaHotels.find(h => h.hotelId === '08'),
                    costaRicaHotels.find(h => h.hotelId === '09'),
                ]
            }
        ],
    },

    // TOUR 12 days
    {
        // TOUR 12 days
        id: TOURS_IDS.tour_12_days,
        urlPath: PATHS.tourInfo + '/'+TOURS_IDS.tour_12_days+'/',
        tourImage: {
            img: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_12_days)?.photo || "",
            url: tourMainPhotos.find(el => el.tourId === TOURS_IDS.tour_12_days)?.photoUrl || "",
        },
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
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '07'),
                    costaRicaHotels.find(h => h.hotelId === '08'),
                    costaRicaHotels.find(h => h.hotelId === '09'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel2'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '04'),
                    costaRicaHotels.find(h => h.hotelId === '05'),
                    costaRicaHotels.find(h => h.hotelId === '06'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel3'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '10'),
                    costaRicaHotels.find(h => h.hotelId === '11'),
                    costaRicaHotels.find(h => h.hotelId === '12'),
                    costaRicaHotels.find(h => h.hotelId === '13'),
                    costaRicaHotels.find(h => h.hotelId === '14'),
                ]
            },
            {
                point: i18next.t('tours.tour'+TOURS_IDS.tour_12_days+'.hotels.hotel4'),
                hotels: [
                    costaRicaHotels.find(h => h.hotelId === '01'),
                    costaRicaHotels.find(h => h.hotelId === '02'),
                    costaRicaHotels.find(h => h.hotelId === '03'),
                ]
            }
        ]
    },
]