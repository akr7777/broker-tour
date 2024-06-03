import { ReactNode } from "react"
import uuid from "react-uuid"
import { TOURS_IDS } from "./consts"

import tour_4_main from '../assets/images/tour_images/tour_3_main.jpg'
import tour_7_main from '../assets/images/tour_images/tour_7_main.jpg'
import tour_9_main from '../assets/images/tour_images/tour_9_main.jpg'
import tour_12_main from '../assets/images/tour_images/tour_12_main.jpg'

import img_7_2_1 from '../assets/images/tour_images/7/tour_7_2_1.jpg'
import img_7_2_2 from '../assets/images/tour_images/7/tour_7_2_2.jpg'
import img_7_3_1 from '../assets/images/tour_images/7/tour_7_3_1.jpg'
import img_7_3_2 from '../assets/images/tour_images/7/tour_7_3_2.jpg'
import img_7_3_3 from '../assets/images/tour_images/7/tour_7_3_3.jpg'
import img_7_4_1 from '../assets/images/tour_images/7/tour_7_4_1.jpg'
import img_7_4_2 from '../assets/images/tour_images/7/tour_7_4_2.jpg'
import img_7_4_3 from '../assets/images/tour_images/7/tour_7_4_3.jpg'
import img_7_5_1 from '../assets/images/tour_images/7/tour_7_5_1.jpg'
import img_7_5_2 from '../assets/images/tour_images/7/tour_7_5_2.jpg'
import img_7_5_3 from '../assets/images/tour_images/7/tour_7_5_3.jpg'
import img_7_6_1 from '../assets/images/tour_images/7/tour_7_6_1.jpg'
import img_7_6_2 from '../assets/images/tour_images/7/tour_7_6_2.jpg'
import img_7_6_3 from '../assets/images/tour_images/7/tour_7_6_3.jpg'

import img_12_6_1 from '../assets/images/tour_images/12/12_6_1.jpg'
import img_12_6_2 from '../assets/images/tour_images/12/12_6_2.jpg'
import img_12_6_3 from '../assets/images/tour_images/12/12_6_3.jpg'
import img_12_7_1 from '../assets/images/tour_images/12/12_7_1.jpg'
import img_12_7_2 from '../assets/images/tour_images/12/12_7_2.jpg'
import img_12_7_3 from '../assets/images/tour_images/12/12_7_3.jpg'
import img_12_8_1 from '../assets/images/tour_images/12/12_8_1.jpg'
import img_12_8_2 from '../assets/images/tour_images/12/12_8_2.jpg'
import img_12_8_3 from '../assets/images/tour_images/12/12_8_3.jpg'
import img_12_9_1 from '../assets/images/tour_images/12/12_9_1.jpg'
import img_12_9_2 from '../assets/images/tour_images/12/12_9_2.jpg'
import img_12_9_3 from '../assets/images/tour_images/12/12_9_3.jpg'
import img_12_10_1 from '../assets/images/tour_images/12/12_10_1.jpg'
import img_12_10_2 from '../assets/images/tour_images/12/12_10_2.jpg'

import img_9_6_1 from '../assets/images/tour_images/9/9_6_1.jpg'


export type TourDaysPhotoType = {
    day: number,
    photos: Array<ReactNode>
}

export type TourPhotoType = {
    tourId: number,
    data: Array<TourDaysPhotoType>
}

export type TourMainPhotoType = {
    tourId: number,
    photo: ReactNode,
    photoUrl: string,
}
export const tourMainPhotos: Array<TourMainPhotoType> = [
    {
        tourId: TOURS_IDS.tour_4_days,
        photo: <img src={tour_4_main} alt="" key={uuid()} />,
        photoUrl: tour_4_main
    },
    {
        tourId: TOURS_IDS.tour_7_days,
        photo: <img src={tour_7_main} alt="volcano arenal , 7 days classic tour two volcanoes and Pacific Ocean , семидневный классический два вулкана и Тихий океан , название файла volcan_arenal_ tour7days" key={uuid()} />,
        photoUrl: tour_7_main
    },
    {
        tourId: TOURS_IDS.tour_9_days,
        photo: <img src={tour_9_main} alt="" key={uuid()} />,
        photoUrl: tour_9_main
    },
    {
        tourId: TOURS_IDS.tour_12_days,
        photo: <img src={tour_12_main} alt="" key={uuid()} />,
        photoUrl: tour_12_main
    },
]

export const tourPhotos: Array<TourPhotoType> = [
    {
        // TOUR 7 days
        tourId: TOURS_IDS.tour_7_days,
        data: [
            {
                day: 2,
                photos: [
                    <img src={img_7_2_1} alt="Manuel Antonio beach , Alt  watermelon at the Manuel Antonio beach, Costa Rica, название файла wharemelon_wave_costarica_manuelantonio" key={uuid()} />,
                    <img src={img_7_2_2} alt="Manuel Antonio park Iguana Anarilla, Коста-Рика Мануэль Антонио парк ящерица с гребнем на спине, кольцехвостая игуана , animal at Manuel Antonio Costa-Rica exotic iguana , название файла iguana_manuel_antonio" key={uuid()} />,
                ]
            },
            {
                day: 3,
                photos: [
                    <img src={img_7_3_1} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_2} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_3} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt яхта в тихом океане , yate_en_el_Océano_Pacífico" key={uuid()} />,
                ]
            },
            {
                day: 4,
                photos: [
                    <img src={img_7_4_1} alt="Monte Verde  butterfly tour, сад бабочек в национальном парке Монте Верде , alt желтая бабочка в Монте Верде Коста-Рика , mariposa en parque nacional Monte Verde Costa Rica , название файла mariposa_monteverde_costarica" key={uuid()} />,
                    <img src={img_7_4_2} alt="Monte Verde Handing bridges Costa Rica , Мосты по джунглям Монте Верде Коста-Рика , название файла monte_verde_costarica" key={uuid()} />,
                    <img src={img_7_4_3} alt="Monte verde cloud forest, облачный лес национальный парк Монте Верде Коста-Рика , monteverde_cloudforest_costarica" key={uuid()} />,
                ]
            },
            {
                day: 5,
                photos: [
                    <img src={img_7_5_1} alt="Volcano Arenal view from Laguna La Fortuna, Вулкан Ареналь Коста-Рика Вид на вулкан Ареналь с лагуны. Volcan Arenal Costa Rica , название файла Volcan_Arenal_view" key={uuid()} />,
                    <img src={img_7_5_2} alt="Водопад Ла Фортуна купание с форелью, Catarata La Fortuna swimming with    fishes , volcano Arenal La Fortuna falls Costa Rica , название файла lafortuna_waterfall_troutriver" key={uuid()} />,
                    <img src={img_7_5_3} alt="Hot natural river springs near volcano Arenal La Fortuna Costa Rica , горячая натуральная река рядом с Вулканом Ареналь Коста-Рика , rio caliente serca de volcán Arenal , hot_river_arenal" key={uuid()} />,
                ]
            },
            {
                day: 6,
                photos: [
                    <img src={img_7_6_1} alt="Парк Ла Пас Коста Рика недалечко от вулкана Поас , parque La Paz Costa Rica  , носуха в парке Ла Пас Коста Рика, coati animal at the Park La Paz Costa Rica , название файла coati_costa_rica." key={uuid()} />,
                    <img src={img_7_6_2} alt="Volcán Poas cráter Costa Rica, Кратер вулкана Поас Коста-Рика , название файла poas_volcano_costarica" key={uuid()} />,
                    <img src={img_7_6_3} alt="Plantaciones de cafe Starbucks Alsacia Costa Rica cofee tour, кофе тур по плантации Старбакс, Коста-Рика , cofee_tour_starbucks" key={uuid()} />,
                ]
            }
        ]
    },
    {
        // TOUR 12 days
        tourId: TOURS_IDS.tour_12_days,
        data: [
            {
                day: 2,
                photos: [
                    <img src={img_7_2_1} alt="Manuel Antonio beach , Alt  watermelon at the Manuel Antonio beach, Costa Rica, название файла wharemelon_wave_costarica_manuelantonio" key={uuid()} />,
                    <img src={img_7_2_2} alt="Manuel Antonio park Iguana Anarilla, Коста-Рика Мануэль Антонио парк ящерица с гребнем на спине, кольцехвостая игуана , animal at Manuel Antonio Costa-Rica exotic iguana , название файла iguana_manuel_antonio" key={uuid()} />,
                ]
            },
            {
                day: 3,
                photos: [
                    <img src={img_7_3_1} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_2} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_3} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt яхта в тихом океане , yate_en_el_Océano_Pacífico" key={uuid()} />,
                ]
            },
            {
                day: 4,
                photos: [
                    <img src={img_7_4_1} alt="Monte Verde  butterfly tour, сад бабочек в национальном парке Монте Верде , alt желтая бабочка в Монте Верде Коста-Рика , mariposa en parque nacional Monte Verde Costa Rica , название файла mariposa_monteverde_costarica" key={uuid()} />,
                    <img src={img_7_4_2} alt="Monte Verde Handing bridges Costa Rica , Мосты по джунглям Монте Верде Коста-Рика , название файла monte_verde_costarica" key={uuid()} />,
                    <img src={img_7_4_3} alt="Monte verde cloud forest, облачный лес национальный парк Монте Верде Коста-Рика , monteverde_cloudforest_costarica" key={uuid()} />,
                ]
            },
            {
                day: 5,
                photos: [
                    <img src={img_7_5_1} alt="Volcano Arenal view from Laguna La Fortuna, Вулкан Ареналь Коста-Рика Вид на вулкан Ареналь с лагуны. Volcan Arenal Costa Rica , название файла Volcan_Arenal_view" key={uuid()} />,
                    <img src={img_7_5_2} alt="Водопад Ла Фортуна купание с форелью, Catarata La Fortuna swimming with    fishes , volcano Arenal La Fortuna falls Costa Rica , название файла lafortuna_waterfall_troutriver" key={uuid()} />,
                    <img src={img_7_5_3} alt="Hot natural river springs near volcano Arenal La Fortuna Costa Rica , горячая натуральная река рядом с Вулканом Ареналь Коста-Рика , rio caliente serca de volcán Arenal , hot_river_arenal" key={uuid()} />,
                ]
            },
            {
                day: 6,
                photos: [
                    <img src={img_12_6_1} alt="Rafting Costa Rica , рафтинг на реке Пакуаре , rafting_costarica" />,
                    <img src={img_12_6_2} alt="zip-line canopi Arenal Ka Fortuna Costa Rica , Зип-Лайн канопи на вулкане Ареналь Коста-Рика, zipline_Arenal_CostaRica" key={uuid()} />,
                    <img src={img_12_6_3} alt="горячая река в термальном парке отеля Табакон, hot river springs at the thermal spa hotel Tabacon , hot_river_springs" key={uuid()} />,
                ]
            },
            {
                day: 7,
                photos: [
                    <img src={img_12_7_1} alt="Atlantic Ocean , Caribbean Sea, Costa Rica, Коста-Рика Атлантический океан , Карибское море пляж Пунта Ува, playa palmas punta uva Caribbean Sea, пальма на пляже карибского моря , atlantic_osean_costarica" key={uuid()} />,
                    <img src={img_12_7_2} alt="день Atlantic Ocean , Caribbean Sea, Costa Rica, Коста-Рика Атлантический океан , Типичное коста-риканское кафе , soda típica caribeña Costa Rica , puertoviejo_costarica_soda" key={uuid()} />,
                    <img src={img_12_7_3} alt="tropical Fruits Atlantic Ocean , Caribbean Sea, Costa Rica, Коста-Рика , тропические фрукты Атлантический океан , Карибское море,tropical_fruits_costarica" key={uuid()} />,
                ]
            },
            {
                day: 8,
                photos: [
                    <img src={img_12_8_1} alt="National Park Cahuita green poison frog, Costa Rica, Национальный парк Кауита зеленая ядовитая лягушка, poison tropical green frog, verde rana venenosa Costa Rica nacional parque Costa Rica, poison_green_frog" key={uuid()} />,
                    <img src={img_12_8_2} alt="красноглазая квакша Agalychnis callidryas древесная лягушка национальный парк Кауита Коста-Рика , frog exotic verde lol I Costa Rica, frog_kolbi_green_costarica" key={uuid()} />,
                    <img src={img_12_8_3} alt="amarilla culebra en parque nacional Cahuita Costa Rica, желтая рогатая змея в национальном парке Кауита Коста-Рика Атлантический океан , змея ботропс шлегеля коста Рика , botrops Schlegel, yellow_snake_costarica" key={uuid()} />,
                ]
            },
            {
                day: 9,
                photos: [
                    <img src={img_12_9_1} alt="cacao tour de Indigenos bri bri talamanca, какао-тур индейская деревня Бри-бри Таламанка , Indigenos de Bri Bri Talamanca , индейцы Бри-Бри карибы Коста-Рика , indigenos_cafetour_talamanca" key={uuid()} />,
                    <img src={img_12_9_2} alt="cacao tour de Indigenos bri bri talamanca, какао-тур индейская деревня Бри-бри Таламанка ,artesanía de Indigenos de Bri Bri Talamanca , сувениры индейцы Бри-Бри карибы Коста-Рика , indigenos_cafetour_Salamanca" key={uuid()} />,
                    <img src={img_12_9_3} alt="cacao tour de Indigenos bri bri talamanca, какао-тур индейская деревня Бри-бри Таламанка , Indigenos de Bri Bri Talamanca , индейцы Бри-Бри карибы Коста-Рика , плод какао дерева cacaofruit_costarica" key={uuid()} />,

                ]
            },
            {
                day: 10,
                photos: [
                    <img src={img_12_10_1} alt="Atlantic Ocean , Caribbean Sea, Costa Rica, Коста-Рика Атлантический океан , Карибское море пляж Мансанийо playa Manzanillo Caribbean Sea, пальма на пляже карибского моря , карибский пляж , национальный парк мансанийо , atlantic_osean_mansanillo_costarica" key={uuid()} />,
                    <img src={img_12_10_2} alt="Atlantic Ocean , Caribbean Sea, Costa Rica, Коста-Рика Атлантический океан , Карибское море пляж кокосе playa palmas playa cóclea Caribbean Sea, пальма на пляже карибского моря , Caribbeansea_costarica" key={uuid()} />,
                ]
            },
            {
                day: 11,
                photos: [
                    <img src={img_7_6_1} alt="Парк Ла Пас Коста Рика недалечко от вулкана Поас , parque La Paz Costa Rica  , носуха в парке Ла Пас Коста Рика, coati animal at the Park La Paz Costa Rica , название файла coati_costa_rica." key={uuid()} />,
                    <img src={img_7_6_2} alt="Volcán Poas cráter Costa Rica, Кратер вулкана Поас Коста-Рика , название файла poas_volcano_costarica" key={uuid()} />,
                    <img src={img_7_6_3} alt="Plantaciones de cafe Starbucks Alsacia Costa Rica cofee tour, кофе тур по плантации Старбакс, Коста-Рика , cofee_tour_starbucks" key={uuid()} />,
                ]
            }
        ]
    },

    {
        // TOUR 4 days
        tourId: TOURS_IDS.tour_4_days,
        data: [
            {
                day: 2,
                photos: [
                    <img src={img_7_6_1} alt="Парк Ла Пас Коста Рика недалечко от вулкана Поас , parque La Paz Costa Rica  , носуха в парке Ла Пас Коста Рика, coati animal at the Park La Paz Costa Rica , название файла coati_costa_rica." key={uuid()} />,
                    <img src={img_7_6_2} alt="Volcán Poas cráter Costa Rica, Кратер вулкана Поас Коста-Рика , название файла poas_volcano_costarica" key={uuid()} />,
                    <img src={img_7_6_3} alt="Plantaciones de cafe Starbucks Alsacia Costa Rica cofee tour, кофе тур по плантации Старбакс, Коста-Рика , cofee_tour_starbucks" key={uuid()} />,
                ]
            },
            {
                day: 3,
                photos: [
                    <img src={img_7_5_1} alt="Volcano Arenal view from Laguna La Fortuna, Вулкан Ареналь Коста-Рика Вид на вулкан Ареналь с лагуны. Volcan Arenal Costa Rica , название файла Volcan_Arenal_view" key={uuid()} />,
                    <img src={img_7_5_2} alt="Водопад Ла Фортуна купание с форелью, Catarata La Fortuna swimming with    fishes , volcano Arenal La Fortuna falls Costa Rica , название файла lafortuna_waterfall_troutriver" key={uuid()} />,
                    <img src={img_7_5_3} alt="Hot natural river springs near volcano Arenal La Fortuna Costa Rica , горячая натуральная река рядом с Вулканом Ареналь Коста-Рика , rio caliente serca de volcán Arenal , hot_river_arenal" key={uuid()} />,
                ]
            },
            {
                day: 4,
                photos: [
                    <img src={img_7_4_1} alt="Monte Verde  butterfly tour, сад бабочек в национальном парке Монте Верде , alt желтая бабочка в Монте Верде Коста-Рика , mariposa en parque nacional Monte Verde Costa Rica , название файла mariposa_monteverde_costarica" key={uuid()} />,
                    <img src={img_7_4_2} alt="Monte Verde Handing bridges Costa Rica , Мосты по джунглям Монте Верде Коста-Рика , название файла monte_verde_costarica" key={uuid()} />,
                    <img src={img_7_4_3} alt="Monte verde cloud forest, облачный лес национальный парк Монте Верде Коста-Рика , monteverde_cloudforest_costarica" key={uuid()} />,
                ]
            }
        ]
    },

    {
        // TOUR 9 days
        tourId: TOURS_IDS.tour_9_days,
        data: [
            {
                day: 2,
                photos: [
                    <img src={img_7_6_1} alt="Парк Ла Пас Коста Рика недалечко от вулкана Поас , parque La Paz Costa Rica  , носуха в парке Ла Пас Коста Рика, coati animal at the Park La Paz Costa Rica , название файла coati_costa_rica." key={uuid()} />,
                    <img src={img_7_6_2} alt="Volcán Poas cráter Costa Rica, Кратер вулкана Поас Коста-Рика , название файла poas_volcano_costarica" key={uuid()} />,
                    <img src={img_7_6_3} alt="Plantaciones de cafe Starbucks Alsacia Costa Rica cofee tour, кофе тур по плантации Старбакс, Коста-Рика , cofee_tour_starbucks" key={uuid()} />,
                ]
            },
            {
                day: 3,
                photos: [
                    <img src={img_7_5_1} alt="Volcano Arenal view from Laguna La Fortuna, Вулкан Ареналь Коста-Рика Вид на вулкан Ареналь с лагуны. Volcan Arenal Costa Rica , название файла Volcan_Arenal_view" key={uuid()} />,
                    <img src={img_7_5_2} alt="Водопад Ла Фортуна купание с форелью, Catarata La Fortuna swimming with    fishes , volcano Arenal La Fortuna falls Costa Rica , название файла lafortuna_waterfall_troutriver" key={uuid()} />,
                    <img src={img_7_5_3} alt="Hot natural river springs near volcano Arenal La Fortuna Costa Rica , горячая натуральная река рядом с Вулканом Ареналь Коста-Рика , rio caliente serca de volcán Arenal , hot_river_arenal" key={uuid()} />,
                ]
            },
            {
                day: 4,
                photos: [
                    <img src={img_12_6_1} alt="Rafting Costa Rica , рафтинг на реке Пакуаре , rafting_costarica" />,
                    <img src={img_12_6_2} alt="zip-line canopi Arenal Ka Fortuna Costa Rica , Зип-Лайн канопи на вулкане Ареналь Коста-Рика, zipline_Arenal_CostaRica" key={uuid()} />,
                    <img src={img_12_6_3} alt="горячая река в термальном парке отеля Табакон, hot river springs at the thermal spa hotel Tabacon , hot_river_springs" key={uuid()} />,
                ]
            },
            {
                day: 5,
                photos: [
                    <img src={img_7_4_1} alt="Monte Verde  butterfly tour, сад бабочек в национальном парке Монте Верде , alt желтая бабочка в Монте Верде Коста-Рика , mariposa en parque nacional Monte Verde Costa Rica , название файла mariposa_monteverde_costarica" key={uuid()} />,
                    <img src={img_7_4_2} alt="Monte Verde Handing bridges Costa Rica , Мосты по джунглям Монте Верде Коста-Рика , название файла monte_verde_costarica" key={uuid()} />,
                    <img src={img_7_4_3} alt="Monte verde cloud forest, облачный лес национальный парк Монте Верде Коста-Рика , monteverde_cloudforest_costarica" key={uuid()} />,
                ]
            },
            {
                day: 6,
                photos: [
                    <img src={img_9_6_1} alt="crocodile’s tour Rio Tarcoles, тур крокодилы на реке Тарколес, Коста-Рика,     Alt крокодил на песке , cocodrilo en la arena, cocodrilo_tarcoles_costarica" key={uuid()} />,
                ]
            },
            {
                day: 7,
                photos: [
                    <img src={img_7_2_1} alt="Manuel Antonio beach , Alt  watermelon at the Manuel Antonio beach, Costa Rica, название файла wharemelon_wave_costarica_manuelantonio" key={uuid()} />,
                    <img src={img_7_2_2} alt="Manuel Antonio park Iguana Anarilla, Коста-Рика Мануэль Антонио парк ящерица с гребнем на спине, кольцехвостая игуана , animal at Manuel Antonio Costa-Rica exotic iguana , название файла iguana_manuel_antonio" key={uuid()} />,
                ]
            },
            {
                day: 8,
                photos: [
                    <img src={img_7_3_1} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_2} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt девушка с большой рыбой на лодке в Тихом океане , bonita chica con un pez grande en un yate en el Océano Pacífico. Chica_yate_fish_costarica" key={uuid()} />,
                    <img src={img_7_3_3} alt="Рыбалка на большую рыбу в Коста-Рике , pesca de peces grandes en Costa Rica , fishing in Costa Rica , alt яхта в тихом океане , yate_en_el_Océano_Pacífico" key={uuid()} />,
                ]
            },
        ]
    }
]