"use client";

import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";
import Magnetic from "@/components/Magnetic";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "thumsUp", color: "#0F1B3C", name: "Thums Up" },
  { flavor: "limca", color: "#2F7B1F", name: "Limca" },
  { flavor: "maaza", color: "#C75A1B", name: "Maaza" },
  { flavor: "campa", color: "#9C0F1E", name: "Campa Cola" },
  { flavor: "appyFizz", color: "#6B3F12", name: "Appy Fizz" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      id="flavors"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-8 text-white sm:py-12"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#0F1B3C] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#0F1B3C]" />

      <h2 className="relative px-4 text-center text-2xl font-bold xs:text-3xl sm:text-4xl md:text-5xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-1 px-2 sm:gap-2 sm:px-0">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className="aspect-square h-[60vmin] min-h-40 xs:h-[70vmin]">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto px-4 text-center">
        <div className="text-wrapper text-xl font-medium xs:text-2xl sm:text-3xl md:text-4xl">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        {/* Pricing hardcoded for the SoftDrinks rebrand — the Prismic field
            still contains the legacy "12 cans - $35.99" copy. */}
        <div className="mt-2 text-base font-normal opacity-90 xs:text-lg sm:text-xl md:text-2xl">
          <p>13 cans – ₹500</p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <Magnetic strength={0.35} range={80}>
      <button
        onClick={onClick}
        className="block size-9 shrink-0 rounded-full border-2 border-white bg-white/10 p-1.5 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 xs:size-10 xs:p-2 sm:size-12 sm:p-3 md:size-16 lg:size-20"
      >
        <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
        <span className="sr-only">{label}</span>
      </button>
    </Magnetic>
  );
}
