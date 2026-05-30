"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      id="about"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-8 px-4 md:grid-cols-2 md:gap-x-12 lg:gap-x-24"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "max-w-md rounded-lg p-4 backdrop-blur-lg max-md:bg-white/40",
                )}
              >
                <h2 className="text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
                  <PrismicText field={item.heading} />
                </h2>
                <div className="mt-4 text-base sm:text-lg md:text-xl">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
