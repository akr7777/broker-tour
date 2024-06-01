import clsx from "clsx";

import "./carousel-arrows.scss";

type PropsType = {
  className?: string,
  direction?: string,
  onClick?: () => void
}
export const CarouselArrows = (props: PropsType) => {
  const { className, direction, onClick } = props;

  return (
    <svg
      className={clsx(className, direction)}
      onClick={onClick}
      style={{ height: 40, width: 40 }}
      version={"1.1"}
      viewBox={"0 0 17 17"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <g id={"SVGRepo_bgCarrier"} strokeWidth={"0"} />
      <g
        id={"SVGRepo_tracerCarrier"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <g id={"SVGRepo_iconCarrier"}>
        <title>1235</title> <defs> </defs>{" "}
        <g fill={"none"} fillRule={"evenodd"} stroke={"none"} strokeWidth={"1"}>
          <path
            className={"si-glyph-fill="}
            d={
              direction === "next"
                ? "M6.113,15.495 C5.531,16.076 4.01,16.395 4.01,14.494 L4.01,1.506 C4.01,-0.333 5.531,-0.076 6.113,0.506 L12.557,6.948 C13.137,7.529 13.137,8.47 12.557,9.052 L6.113,15.495 L6.113,15.495 Z"
                : "M3.446,10.052 C2.866,9.471 2.866,8.53 3.446,7.948 L9.89,1.506 C10.471,0.924 11.993,0.667 11.993,2.506 L11.993,15.494 C11.993,17.395 10.472,17.076 9.89,16.495 L3.446,10.052 L3.446,10.052 Z"
            }
            fill={"#fff"}
          ></path>
        </g>
      </g>
    </svg>
  );
};
