import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]"
    >
      {/* Sizes tuned so the longest words ("laaye", "Swaad") never spill
          past the viewport on mobile. Constants were ~34vw / ~40vw — those
          overflow on narrow phones because letter widths > 1.2 · vw. */}
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[26vw] md:text-[28vw]">Desi</div>
        <div className="grid gap-[3vw] text-[24vw] md:flex md:text-[11vw]">
          <span className="inline-block">soda</span>
          <span className="inline-block max-md:text-[22vw]">jo</span>
          <span className="inline-block max-md:text-[26vw]">laaye</span>
        </div>
        <div className="text-[26vw] md:text-[28vw]">Swaad</div>
      </h2>
    </section>
  );
};

export default BigText;
