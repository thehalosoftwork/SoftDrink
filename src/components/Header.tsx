"use client";

import React from "react";
import { FizziLogo } from "@/components/FizziLogo";
import Magnetic from "@/components/Magnetic";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] -mb-20 flex justify-center px-4 py-4 md:-mb-28 pointer-events-none">
      <div className="pointer-events-auto">
        <Magnetic strength={0.15}>
          <a href="#hero" className="group outline-none block">
            <FizziLogo className="h-14 cursor-pointer text-[#0F1B3C] sm:h-16 md:h-20 transition-all duration-300 ease-in-out hover:scale-105" />
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
