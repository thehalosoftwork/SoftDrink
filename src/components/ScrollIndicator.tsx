"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    // Show scroll indicator slightly after client mount to coordinate with preloader exit
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4500); // Fades in smoothly after preloader curtain slides up

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(showTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 select-none pointer-events-none transition-all duration-700 ease-in-out ${
        scrolledPast ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Tiny Animated Scroll Mouse/Track line */}
      <div className="relative w-5 h-8 rounded-full border border-[#0F1B3C]/50 flex justify-center py-1.5 backdrop-blur-[2px]">
        {/* Pulsing wheel */}
        <div className="w-1 h-2 rounded-full bg-[#FE6334] animate-bounce" style={{ animationDuration: "1.6s" }} />
      </div>

      {/* Elegant minimalist text */}
      <span className="text-[10px] font-bold tracking-[0.25em] text-[#0F1B3C]/75 uppercase">
        Scroll to Explore
      </span>
    </div>
  );
}
