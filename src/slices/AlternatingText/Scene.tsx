"use client";

import { Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Cycled through as the user scrolls between alternating sections — so every
// section shows a different Indian brand instead of the same can.
const SECTION_FLAVORS: NonNullable<SodaCanProps["flavor"]>[] = [
  "maaza",
  "campa",
  "thumsUp",
  "limca",
  "appyFizz",
];

type Props = {};

export default function Scene({}: Props) {
  const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const [flavorIndex, setFlavorIndex] = useState(0);

  const bgColors = ["#FFC9A6", "#FFE9B5", "#CBEF9A", "#C9E4FF", "#F4C9FF"];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Horizontal offset for the floating can. The camera uses fov: 30 at
      // z=5, which gives a horizontal half-width of only ~1.34 units on a
      // square aspect (and ~1.79 on a 4:3 laptop). The can itself has
      // roughly a 0.6-unit radius, so anything past ~0.9–1.0 starts to
      // clip on smaller / narrower screens. 0.9 keeps it fully on-screen
      // on every desktop aspect while still pushing it away from the text.
      const X_OFFSET = 0.9;

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 !== 0;

        const xPosition = isDesktop ? (isOdd ? -X_OFFSET : X_OFFSET) : 0;
        const yRotation = isDesktop ? (isOdd ? 0.4 : -0.4) : 0;
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: yRotation,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          });
      });

      // A separate (non-scrubbed) ScrollTrigger per section drives the flavor
      // swap, so the can on screen matches the section text.
      const flavorTriggers = sections.map((section, index) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setFlavorIndex(index % SECTION_FLAVORS.length),
          onEnterBack: () => setFlavorIndex(index % SECTION_FLAVORS.length),
        }),
      );

      return () => {
        flavorTriggers.forEach((t) => t.kill());
      };
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      ref={canRef}
      position-x={isDesktop ? 0.9 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
      scale={isDesktop ? 0.85 : 0.65}
    >
      <FloatingCan flavor={SECTION_FLAVORS[flavorIndex]} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
