import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

const SITE_TITLE = "SoftDrinks – India's SoftDrink 3D Soda Site";
const SITE_DESCRIPTION =
  "SoftDrinks – India's SoftDrink 3D Soda Site by HaloSoft. Thums Up, Limca, Maaza, Campa Cola and Appy Fizz – five iconic Indian brands in one immersive 3D experience.";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: SITE_TITLE,
    description: home.data.meta_description ?? SITE_DESCRIPTION,
    openGraph: {
      title: SITE_TITLE,
      description: home.data.meta_description ?? SITE_DESCRIPTION,
      // Always use the local SoftDrinks artwork so social previews never fall
      // back to the legacy Fizzi image still stored in the Prismic CMS.
      images: [{ url: "/cans-hero.png" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return <SliceZone slices={home.data.slices} components={components} />;
}
