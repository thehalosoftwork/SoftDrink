"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";
/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>;

const VALID_FLAVORS = ["thumsUp", "limca", "maaza", "campa", "appyFizz"] as const;
type SkyDiveFlavor = (typeof VALID_FLAVORS)[number];

// Force a guaranteed brand for the SkyDive can. Prismic documents created
// before the rebrand may still carry legacy values like "watermelon" — fall
// back to Maaza (mango = freshness) so the tin always shows real branding.
function normalizeFlavor(value: unknown): SkyDiveFlavor {
  return VALID_FLAVORS.includes(value as SkyDiveFlavor)
    ? (value as SkyDiveFlavor)
    : "maaza";
}

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive = ({ slice }: SkyDiveProps): JSX.Element => {
  const flavor = normalizeFlavor(slice.primary.flavor);

  return (
    <Bounded
      id="experience"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="skydive h-screen"
    >
      <h2 className="sr-only">{slice.primary.sentence}</h2>
      <View className="h-screen w-screen">
        <Scene flavor={flavor} sentence={slice.primary.sentence} />
      </View>
    </Bounded>
  );
};

export default SkyDive;
