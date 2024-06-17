import { useState, useEffect } from "react";
import {
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_LG,
  SCREEN_XL,
  SCREEN_XXL,
} from "./const-breakpoints";

export type ResizeType = {
  width: number;
  isScreenSm: boolean;
  isScreenMd: boolean;
  isScreenLg: boolean;
  isScreenXl: boolean;
  isScreenXxl: boolean;
};
export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    handleResize()
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    height,
    isScreenSm: width >= SCREEN_SM, // 550
    isScreenMd: width >= SCREEN_MD, // 768
    isScreenLg: width >= SCREEN_LG, // 1100
    isScreenXl: width >= SCREEN_XL, // 1200
    isScreenXxl: width >= SCREEN_XXL, // 1400
  };
};
