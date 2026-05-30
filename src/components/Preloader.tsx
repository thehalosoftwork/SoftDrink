"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useStore } from "@/hooks/useStore";

export default function Preloader() {
  const ready = useStore((state) => state.ready);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Gathering fresh ingredients...");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const overlayPathRef = useRef<SVGPathElement>(null);
  const overlaySvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update loading text based on progress
  useEffect(() => {
    if (progress < 25) {
      setLoadingText("Gathering fresh ingredients...");
    } else if (progress < 50) {
      setLoadingText("Carbonating the spirits...");
    } else if (progress < 75) {
      setLoadingText("Chilling to 2°C...");
    } else if (progress < 99) {
      setLoadingText("Serving ice cold...");
    } else {
      setLoadingText("Enjoy the fizz!");
    }
  }, [progress]);

  useEffect(() => {
    if (!isClient) return;

    // Simulate loading progress
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 88) {
          // Normal increment
          return prev + Math.floor(Math.random() * 5) + 1;
        } else if (prev >= 88 && prev < 95) {
          // Slow down near 95%
          // Wait for Three.js state
          return prev + (ready ? 1 : 0);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isClient, ready]);

  // Once 3D canvas is ready, jump to 100%
  useEffect(() => {
    if (!isClient) return;
    if (ready && progress >= 88) {
      setProgress(100);
    }
  }, [ready, progress, isClient]);

  // Exit animation when progress hits 100%
  useEffect(() => {
    if (progress !== 100 || !isClient) return;

    // Lock body scrolling during preloader and release after transition
    document.body.style.overflow = "hidden";
    
    // Stop Lenis during transition if available
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.stop === "function") lenis.stop();

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        document.body.style.overflow = "";
        // Start Lenis scroll tracking once page is visible
        if (lenis && typeof lenis.start === "function") lenis.start();
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });

    // Animate counter and text fading out
    tl.to(".preloader-content", {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power3.inOut",
    });

    // Morph the SVG curtain path up to create a premium curved slide-up reveal
    const morphDuration = 1.0;
    
    // SVG path morphing for the liquid curtain wipe
    tl.to(
      overlayPathRef.current,
      {
        attr: { d: "M 0 100 V 30 Q 50 0 100 30 V 100 Z" },
        duration: morphDuration * 0.4,
        ease: "power2.in",
      },
      "-=0.3"
    )
    .to(
      overlayPathRef.current,
      {
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 Z" },
        duration: morphDuration * 0.6,
        ease: "power2.out",
      }
    )
    .to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 1.1,
        ease: "power4.inOut",
      },
      `-=${morphDuration}`
    );

    // Cinematic fade-in and scale-down of the main content
    tl.fromTo(
      ".hero",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
      `-=${morphDuration * 0.8}`
    );

    // Also reveal header
    tl.fromTo(
      "header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      `-=${morphDuration * 0.8}`
    );

  }, [progress, isClient]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F19] text-white select-none overflow-hidden"
    >
      {/* Curved SVG overlay path at the bottom for premium morph transition */}
      <svg
        ref={overlaySvgRef}
        className="absolute inset-0 pointer-events-none h-full w-full fill-[#0B0F19]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={overlayPathRef}
          d="M 0 100 V 100 Q 50 100 100 100 V 100 Z"
        />
      </svg>

      {/* Floating abstract bubble elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="bubble-loader absolute bottom-[-10%] left-[10%] w-8 h-8 rounded-full bg-orange-500 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="bubble-loader absolute bottom-[-15%] left-[40%] w-14 h-14 rounded-full bg-yellow-400 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="bubble-loader absolute bottom-[-12%] left-[70%] w-10 h-10 rounded-full bg-blue-500 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="bubble-loader absolute bottom-[-8%] left-[85%] w-6 h-6 rounded-full bg-green-500 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
      </div>

      <div className="preloader-content relative z-10 flex flex-col items-center max-w-lg px-6 text-center xs:px-8">
        {/* Brand visual preview */}
        <div className="mb-6 flex items-center justify-center space-x-2 xs:mb-8">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 xs:text-xs xs:tracking-[0.3em]">
            SoftDrinks Lab Presents
          </span>
        </div>

        {/* Large Typography Counter */}
        <div className="relative font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl mb-4 overflow-hidden tracking-tighter">
          <div ref={countRef} className="tabular-nums flex items-baseline">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              {progress}
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl ml-1 text-gray-500 font-light">%</span>
          </div>
        </div>

        {/* Loading message */}
        <div className="h-8 mb-12">
          <p className="text-sm sm:text-base font-medium tracking-wide text-gray-300 animate-pulse duration-1000">
            {loadingText}
          </p>
        </div>

        {/* Minimal Premium Progress Track */}
        <div className="relative w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mini label */}
        <div className="mt-4 text-[10px] text-gray-500 tracking-wider uppercase">
          Serving Happiness in 3D
        </div>
      </div>

      {/* Aesthetic ambient lighting glowing at the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[200px] h-[200px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
