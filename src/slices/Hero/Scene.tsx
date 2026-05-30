"use client";

import { useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    // Scale and coordinate adjustments to fit mobile and desktop viewports elegantly
    const canScale = isDesktop ? 1 : 0.6;
    const xOffset = isDesktop ? 1.5 : 0.65;
    const yOffset = isDesktop ? 0 : -0.25;

    // Apply scales
    const allCans = [can1Ref.current, can2Ref.current, can3Ref.current, can4Ref.current, can5Ref.current];
    allCans.forEach(can => {
      gsap.set(can.scale, { x: canScale, y: canScale, z: canScale });
    });

    // Set can starting location
    gsap.set(can1Ref.current.position, { x: -xOffset, y: yOffset });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: xOffset, y: yOffset });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: isDesktop ? 2 : 1, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });

    if (window.scrollY < 20) {
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      // Rotate can group
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      // Can 1 - Thums Up
      .to(can1Ref.current.position, { x: isDesktop ? -0.2 : -0.1, y: isDesktop ? -0.7 : -0.4, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)

      // Can 2 - Limca
      .to(can2Ref.current.position, { x: isDesktop ? 1 : 0.4, y: isDesktop ? -0.2 : -0.1, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)

      // Can 3 - Campa Cola
      .to(can3Ref.current.position, { x: isDesktop ? -0.3 : -0.15, y: isDesktop ? 0.5 : 0.25, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)

      // Can 4 - Appy Fizz
      .to(can4Ref.current.position, { x: 0, y: isDesktop ? -0.3 : -0.15, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)

      // Can 5 - Maaza
      .to(can5Ref.current.position, { x: isDesktop ? 0.3 : 0.15, y: isDesktop ? 0.5 : 0.25, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      .to(
        groupRef.current.position,
        { x: isDesktop ? 1 : 0, duration: 3, ease: "sine.inOut" },
        1.3,
      );
  }, { dependencies: [isDesktop] });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="thumsUp"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="limca"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan ref={can3Ref} flavor="campa" floatSpeed={FLOAT_SPEED} />

      <FloatingCan
        ref={can4Ref}
        flavor="appyFizz"
        floatSpeed={FLOAT_SPEED}
      />

      <FloatingCan ref={can5Ref} flavor="maaza" floatSpeed={FLOAT_SPEED} />

      {/* <OrbitControls /> */}
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
