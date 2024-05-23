import Slider from "react-slick";
import { OurTourCaruselWidget } from "../../widgets/our-tours-widget/our-tours-widget";
import { ReactNode } from "react";
import { CarouselArrows } from "./arrows/carousel-arrows";
import uuid from 'react-uuid';

import tourImg1 from '../../assets/images/tour-1.jpeg'
import tourImg2 from '../../assets/images/tour-2.jpeg'
import tourImg3 from '../../assets/images/tour-3.jpeg'

import "./carusel-classes.scss";
import "./slick-theme.scss";
import "./slick.scss";

export const Carousel = () => {

  const caruselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true,
    focusOnSelect: true,
    appendDots: (dots: Array<ReactNode>) => (
      <div>
        {dots.map(d => <ul key={uuid()}>{d}</ul>)}
      </div>
    ),
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    // dotsClass: "button__bar",
    // arrows: false
   
  };

  return (
    <Slider
      // className={"carusel-wrapper"}
      nextArrow={<CarouselArrows direction={"next"} />}
      prevArrow={<CarouselArrows direction={"prev"} />}
      {...caruselSettings}
    >
      {/* {children} */}
      <OurTourCaruselWidget text={"text1"} bgUrl={tourImg1} title={'title1'} />
      <OurTourCaruselWidget text={"text2"} bgUrl={tourImg2} title={'title2'} />
      <OurTourCaruselWidget text={"text3"} bgUrl={tourImg3} title={'title3'} />
    </Slider>
  );
};
