import i18next from "i18next"
import { LINE_DEVIDER } from "./consts"
import { PATHS } from "../widgets/nav-menu/nav-paths"

import t1Image from '../assets/images/tour-1.jpeg'
import t2Image from '../assets/images/tour-2.jpeg'
import t3Image from '../assets/images/tour-3.jpeg'

import t1Icon from '../assets/icons/main-page.png'
import t2Icon from '../assets/icons/main-page.png'
import t3Icon from '../assets/icons/main-page.png'


export type PlanDayType = {
    dayNumber: number,
    dayContent: Array<string>
}
export type AdultPriceType = {
    personsCount: number,
    oneAdultPrice: number,
}
export type PriceAdditionalInfoType = {
    // maxPersons: number,
    // info: string,
    divCount: number,
    info1: string,
    info2: string,
}

export type TourType = {
    id: number,
    title: string,
    description: string,
    minPrice: number,
    plan: Array<PlanDayType>,
    adultPrice: Array<AdultPriceType>,
    childAbsDiscount: number,
    // priceAdditionalInfo: Array<PriceAdditionalInfoType>,
    // priceAdditionalInfo: PriceAdditionalInfoType,
    urlPath: string,//typeof PATHS.tour1 | typeof PATHS.tour2 | typeof PATHS.tour3
    daysCount: number,
    tourImage: string,
    tourIcon: string,

}
// console.log("TOUR INFO / i18next.t('tours.tour1.plan.day1')=", i18next.t('tours.tour1.plan.day1'));


// const tour1Plan = ():Array<PlanDayType> => {
//     const tour1PlanResult: Array<PlanDayType> = []
//     for (let i=1; i<=7; i++) {
//         tour1PlanResult.push({
//             dayNumber: i, 
//             dayContent: i18next.t('tours.tour1.plan.day' + i) ? i18next.t('tours.tour1.plan.day' + i).split(LINE_DEVIDER) : []
//             // dayContent: i18next.t('tours.tour1.plan.day' + i)
//         })
//     }
//     return tour1PlanResult
// }

// const tour2Plan = ():Array<PlanDayType> => {
//     const tour1PlanResult: Array<PlanDayType> = []
//     for (let i=1; i<=12; i++) {
//         tour1PlanResult.push({
//             dayNumber: i, 
//             dayContent: i18next.t('tours.tour2.plan.day' + i) ? i18next.t('tours.tour2.plan.day' + i).split(LINE_DEVIDER) : []
//             // dayContent: i18next.t('tours.tour1.plan.day' + i)
//         })
//     }
//     return tour1PlanResult
// }

// const tour3Plan = ():Array<PlanDayType> => {
//     const tour1PlanResult: Array<PlanDayType> = []
//     for (let i=1; i<=4; i++) {
//         tour1PlanResult.push({
//             dayNumber: i, 
//             dayContent: i18next.t('tours.tour3.plan.day' + i) ? i18next.t('tours.tour3.plan.day' + i).split(LINE_DEVIDER) : []
//             // dayContent: i18next.t('tours.tour1.plan.day' + i)
//         })
//     }
//     return tour1PlanResult
// }

type TourPlanCreatorType = {days: number, tourI18n: string}
const tourPlanCreator = (props: TourPlanCreatorType):Array<PlanDayType> => {
    const tour1PlanResult: Array<PlanDayType> = []
    for (let i=1; i<=props.days; i++) {
        tour1PlanResult.push({
            dayNumber: i, 
            dayContent: i18next.t(props.tourI18n +'.plan.day' + i) 
                    ? i18next.t(props.tourI18n+'.plan.day' + i).split(LINE_DEVIDER) 
                    : []
            // dayContent: i18next.t('tours.tour1.plan.day' + i)
        })
    }
    return tour1PlanResult
}

export const toursContent = ():Array<TourType> => [
    {
        id: 1,
        urlPath: PATHS.tourInfo + '/1',
        tourImage: t1Image,
        tourIcon: t1Icon,
        daysCount: Number(i18next.t('tours.tour1.days-count')),
        title: i18next.t('tours.tour1.title'),
        description: i18next.t('tours.tour1.description'),
        minPrice: 690,
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour1.days-count')),
            tourI18n: 'tours.tour1'
        }),
        // plan: tour1Plan(),
        // plan: [
        //     {
        //        dayNumber: 1,
        //        dayContent: i18next.t('tours.tour1.plan.day1') ? i18next.t('tours.tour1.plan.day1').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 2,
        //         dayContent: i18next.t('tours.tour1.plan.day2') ? i18next.t('tours.tour1.plan.day2').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 3,
        //         dayContent: i18next.t('tours.tour1.plan.day3') ? i18next.t('tours.tour1.plan.day3').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 4,
        //         dayContent: i18next.t('tours.tour1.plan.day4') ? i18next.t('tours.tour1.plan.day4').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 5,
        //         dayContent: i18next.t('tours.tour1.plan.day5') ? i18next.t('tours.tour1.plan.day5').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 6,
        //         dayContent: i18next.t('tours.tour1.plan.day6') ? i18next.t('tours.tour1.plan.day6').split(LINE_DEVIDER) : []
        //     },
        //     {
        //         dayNumber: 7,
        //         dayContent: i18next.t('tours.tour1.plan.day7') ? i18next.t('tours.tour1.plan.day7').split(LINE_DEVIDER) : []
        //     },
        // ],
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
        // priceAdditionalInfo: {
        //     divCount: 4,
        //     info1: 'включая оплату всех входных билетов по программе, а также  транспортное обслуживание по всему маршруту.',
        //     info2: 'в 10 местном приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.',
        // }
            // {
            //     maxPersons: 4,
            //     info: 'включая оплату всех входных билетов по программе, а также  транспортное обслуживание по всему маршруту.'
            // },
            // {
            //     maxPersons: 8,
            //     info: 'в 10 местном приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.'
            // }
            
        
    },




    {
        id: 2,
        urlPath: PATHS.tourInfo + '/2',
        tourImage: t2Image,
        tourIcon: t2Icon,
        title: i18next.t('tours.tour2.title'),
        description: i18next.t('tours.tour2.description'),
        minPrice: 690,
        daysCount: Number(i18next.t('tours.tour2.days-count')),
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour2.days-count')),
            tourI18n: 'tours.tour2'
        }),
        // plan: tour2Plan(),
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
        // priceAdditionalInfo: {
        //     divCount: 4,
        //     info1: 'в 4 местном  приватном автомобиле типа Хюндай Сантафе с гидом-водителем.',
        //     info2: 'включая оплату всех входных билетов по программе, а также, транспортное обслуживание по всему маршруту. Цена данной программы для Вашей группы 5-8 человека в 10 местном  приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.',
        // }
            // {
            //     maxPersons: 4,
            //     info: 'в 4 местном  приватном автомобиле типа Хюндай Сантафе с гидом-водителем.'
            // },
            // {
            //     maxPersons: 8,
            //     info: 'включая оплату всех входных билетов по программе, а также, транспортное обслуживание по всему маршруту. Цена данной программы для Вашей группы 5-8 человека в 10 местном  приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.'
            // }
        
    },


    {
        id: 3,
        urlPath: PATHS.tourInfo + '/3',
        title: i18next.t('tours.tour3.title'),
        tourImage: t3Image,
        tourIcon: t3Icon,
        description: i18next.t('tours.tour3.description'),
        daysCount: Number(i18next.t('tours.tour3.days-count')),
        minPrice: 570,
        // plan: tour3Plan(),
        plan: tourPlanCreator({
            days: Number(i18next.t('tours.tour3.days-count')),
            tourI18n: 'tours.tour3'
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
        // priceAdditionalInfo: {
        //     divCount: 4,
        //     info1: 'в 4 местном  приватном автомобиле типа Хюндай Сантафе с гидом-водителем.',
        //     info2: 'включая оплату всех входных билетов по программе, а также, транспортное обслуживание по всему маршруту. Цена данной программы для Вашей группы 5-8 человека в 10 местном  приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.',
        // }
            // {
            //     maxPersons: 4,
            //     info: 'в 4 местном  приватном автомобиле типа Хюндай Сантафе с гидом-водителем.'
            // },
            // {
            //     maxPersons: 8,
            //     info: 'включая оплату всех входных билетов по программе, а также, транспортное обслуживание по всему маршруту. Цена данной программы для Вашей группы 5-8 человека в 10 местном  приватном минивэне типа Хюндай с местным водителем и гидом,говорящим на вашем языке, в дни ,когда это необходимо.'
            // }
        
    }

]