import clsx from "clsx";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  className?: string;
};

export default function CircleText({
  textColor = "#1A871D",
  backgroundColor = "#FFFCFA",
  className,
}: Props) {
  const phrase = "SOFTDRINKS · TASTE OF INDIA · BHARAT KA SWAAD · ";
  const repeated = phrase.repeat(2);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 123 123"
      className={clsx("circle-text", className)}
      aria-labelledby="circle-text-title"
    >
      <title id="circle-text-title">SoftDrinks - Taste of India</title>
      <defs>
        <path
          id="circle-text-path"
          d="M 61.5 61.5 m -48 0 a 48 48 0 1 1 96 0 a 48 48 0 1 1 -96 0"
        />
      </defs>
      <circle
        cx="61.5"
        cy="61.5"
        r="61"
        fill={backgroundColor}
      />
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: "61.5px 61.5px" }}
      >
        <text
          fill={textColor}
          fontFamily="var(--font-alpino), sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="2"
        >
          <textPath href="#circle-text-path" startOffset="0">
            {repeated}
          </textPath>
        </text>
      </g>
    </svg>
  );
}
