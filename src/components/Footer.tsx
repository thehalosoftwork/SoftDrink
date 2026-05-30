import React from "react";
import { SoftDrinksLogo } from "./SoftDrinksLogo";
import CircleText from "./CircleText";
import Magnetic from "./Magnetic";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
        <Magnetic strength={0.15}>
          <SoftDrinksLogo className="h-16 md:h-20 cursor-pointer" />
        </Magnetic>
        {/* CircleText badge — hidden on phones (it overlapped the logo on
            narrow screens), revealed from md upwards. */}
        <div className="absolute right-6 top-0 hidden size-32 origin-center -translate-y-16 md:right-24 md:block md:size-48 md:-translate-y-28">
          <CircleText />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl border-t border-[#FE6334]/20 px-4 py-6 text-center text-xs font-medium sm:text-sm">
        <p>
          Developed by{" "}
          <Magnetic strength={0.2}>
            <a
              href="https://www.thehalosoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline-offset-4 hover:underline"
            >
              HaloSoft
            </a>
          </Magnetic>
        </p>
        <p className="mt-1">
          Designed by{" "}
          <Magnetic strength={0.2}>
            <a
              href="https://github.com/gowtham2213"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline-offset-4 hover:underline"
            >
              @gowtham2213
            </a>
          </Magnetic>
          {" "}&amp;{" "}
          <Magnetic strength={0.2}>
            <a
              href="https://github.com/nikitha2366"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline-offset-4 hover:underline"
            >
              @nikitha2366
            </a>
          </Magnetic>
        </p>
        <p className="mt-3 text-xs opacity-70">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.thehalosoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            HaloSoft
          </a>{" "}
          &middot; India&apos;s SoftDrink 3D Soda Site &middot; All rights reserved
        </p>
      </div>
    </footer>
  );
}
