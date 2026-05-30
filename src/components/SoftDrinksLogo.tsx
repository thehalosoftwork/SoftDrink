import { SVGProps } from "react";
import clsx from "clsx";

export function SoftDrinksLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="260"
      height="87"
      fill="none"
      viewBox="0 0 260 87"
      className={clsx("group", props.className)}
      aria-labelledby="softdrinks-logo-title"
    >
      <title id="softdrinks-logo-title">SoftDrinks</title>
      <defs>
        <clipPath id="softdrinks-clip">
          <rect width="260" height="87" />
        </clipPath>
      </defs>
      <g clipPath="url(#softdrinks-clip)">
        <mask
          id="softdrinks-mask"
          style={{ maskType: "alpha" }}
          width="500"
          height="118"
          x="-5"
          y="-31"
          maskUnits="userSpaceOnUse"
        >
          <g className="transition-transform duration-500 ease-in-out group-hover:translate-y-[80%]">
            <path
              fill="currentColor"
              className="animate-slide-left"
              d="M45.3-31C24.9-31.7 15.9-26.6 0-16.4V87h520V-16.5l-4 1.7A74 74 0 0 1 477.3-7c-11.9-.3-24.7-5.7-38-11.3-14-5.9-28.6-12-43-12.6-20.4-.9-29.4 4.2-45.3 14.4l-4 1.7A74 74 0 0 1 306.3-7c-11.9-.3-24.7-5.7-38-11.3-14-5.9-28.6-12-43-12.6-20.4-.9-29.4 4.2-45.3 14.4l-4 1.7A74 74 0 0 1 136.3-7c-11.9-.3-24.7-5.7-38-11.3-14-5.9-28.6-12-43-12.6Z"
            />
          </g>
        </mask>
        <g mask="url(#softdrinks-mask)">
          <text
            x="0"
            y="40"
            fill="currentColor"
            fontFamily="var(--font-alpino), sans-serif"
            fontWeight="900"
            fontSize="40"
            letterSpacing="-1.5"
            style={{ textTransform: "uppercase" }}
          >
            Soft
          </text>
          <text
            x="0"
            y="80"
            fill="currentColor"
            fontFamily="var(--font-alpino), sans-serif"
            fontWeight="900"
            fontSize="40"
            letterSpacing="-1.5"
            style={{ textTransform: "uppercase" }}
          >
            Drinks
          </text>
          <circle
            cx="178"
            cy="22"
            r="6"
            fill="currentColor"
            className="origin-center transition-transform duration-500 ease-in-out group-hover:scale-150"
          />
          <path
            d="M160 50 q 8 -10 16 0 t 16 0 t 16 0 t 16 0"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="160"
            y="78"
            fill="currentColor"
            fontFamily="var(--font-alpino), sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="3"
            style={{ textTransform: "uppercase" }}
          >
            Bharat
          </text>
        </g>
      </g>
    </svg>
  );
}
