"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: React.ReactElement<any>;
  range?: number; // Active distance of magnetic attraction (in pixels)
  strength?: number; // Power of the pull (0.1 to 1.0)
};

export default function Magnetic({ children, range = 60, strength = 0.3 }: MagneticProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Distance between mouse pointer and element center
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < range) {
        // Smoothly pull element towards cursor
        gsap.to(el, {
          x: deltaX * strength,
          y: deltaY * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Return back home with beautiful elastic feedback
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, strength]);

  return (
    <span ref={containerRef} className="inline-block">
      {children}
    </span>
  );
}
