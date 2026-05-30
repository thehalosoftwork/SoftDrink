"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#FDE047",
          },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded
      id="hero"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] h-screen w-screen block">
        <Scene />
        <Bubbles count={isDesktop ? 300 : 80} speed={2} repeat={true} />
      </View>

      <div className="grid">
        <div className="grid min-h-screen place-items-center py-12 md:h-screen md:py-0">
          <div className="grid auto-rows-min place-items-center gap-y-6 text-center md:gap-y-0">
            <h1 className="hero-header text-6xl font-black uppercase leading-[.8] text-orange-500 sm:text-7xl md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading text-balance text-3xl font-semibold text-sky-950 sm:text-4xl md:mt-12 md:text-5xl lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-balance text-lg font-normal text-sky-950 sm:text-xl md:text-2xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-6 md:mt-12"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid min-h-screen items-center gap-6 py-12 md:h-screen md:grid-cols-2 md:gap-4 md:py-0">
          <div>
            <h2 className="text-side-heading text-balance text-5xl font-black uppercase text-sky-950 sm:text-6xl lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-lg font-normal text-sky-950 sm:text-xl">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
