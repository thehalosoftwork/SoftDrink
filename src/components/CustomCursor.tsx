"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isVisible, setIsClient] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Detect if device supports touch/hover
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsClient(true);

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursorDot || !cursorRing) return;

    // Set initial positions
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for ultra-smooth performance
    const xDotTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const yDotTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });

    const xRingTo = gsap.quickTo(cursorRing, "x", { duration: 0.4, ease: "power3.out" });
    const yRingTo = gsap.quickTo(cursorRing, "y", { duration: 0.4, ease: "power3.out" });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      xDotTo(mouseX);
      yDotTo(mouseY);

      xRingTo(mouseX);
      yRingTo(mouseY);
    };

    const onMouseEnterWindow = () => {
      gsap.to([cursorDot, cursorRing], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeaveWindow = () => {
      gsap.to([cursorDot, cursorRing], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    // Context-aware hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function") return;

      // Closest Interactive Parent
      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer, input, select, textarea") as HTMLElement;
      const carouselEl = target.closest(".carousel") as HTMLElement;
      const canvasEl = target.closest(".hero-scene, .skydive") as HTMLElement;

      if (interactiveEl) {
        // Expand ring and fade dot
        gsap.to(cursorRing, {
          scale: 1.8,
          backgroundColor: "transparent",
          borderColor: "rgba(254, 99, 52, 0.8)",
          borderWidth: "1.5px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          backgroundColor: "#FE6334",
          duration: 0.3,
        });

        // Specific handling for carousel arrows
        const label = interactiveEl.getAttribute("aria-label") || interactiveEl.textContent || "";
        if (interactiveEl.tagName === "BUTTON" && (label.toLowerCase().includes("next") || label.toLowerCase().includes("previous") || label.toLowerCase().includes("flavor"))) {
          if (cursorText) {
            cursorText.textContent = label.toLowerCase().includes("next") || label.toLowerCase().includes("right") ? "→" : "←";
            gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.2 });
            gsap.to(cursorRing, { scale: 1.5, backgroundColor: "transparent", borderColor: "#FE6334", borderWidth: "1.5px", duration: 0.3 });
            gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
          }
        }
      } else if (carouselEl) {
        // Soft hover indicator for carousel
        gsap.to(cursorRing, {
          scale: 2.2,
          borderColor: "rgba(255, 255, 255, 0.4)",
          borderWidth: "1px",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        if (cursorText) {
          cursorText.textContent = "SPIN";
          gsap.to(cursorText, { opacity: 0.8, scale: 0.7, duration: 0.2 });
        }
      } else if (canvasEl) {
        // Soft hover indicator for 3D canvases
        gsap.to(cursorRing, {
          scale: 2.5,
          borderColor: "rgba(254, 99, 52, 0.3)",
          borderWidth: "1px",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        if (cursorText) {
          cursorText.textContent = "DRAG";
          gsap.to(cursorText, { opacity: 0.8, scale: 0.7, duration: 0.2 });
        }
      } else {
        // Reset to default
        gsap.to(cursorRing, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(254, 99, 52, 0.5)",
          borderWidth: "2px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, {
          scale: 1,
          opacity: 1,
          backgroundColor: "#FE6334",
          duration: 0.3,
        });
        if (cursorText) {
          gsap.to(cursorText, { opacity: 0, scale: 0.5, duration: 0.2 });
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Initial load animation
    gsap.fromTo([cursorDot, cursorRing], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.5, stagger: 0.1 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precise Central Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FE6334] pointer-events-none z-[10000] mix-blend-difference opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Outer Spring Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#FE6334]/50 pointer-events-none z-[9999] opacity-0 flex items-center justify-center text-center overflow-hidden"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <span
          ref={cursorTextRef}
          className="text-[9px] font-black tracking-widest text-white select-none opacity-0 scale-50"
        >
          DRAG
        </span>
      </div>
    </>
  );
}
