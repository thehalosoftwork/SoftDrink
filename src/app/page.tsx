import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/siteMetadata";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  // Metadata is hardcoded to the SoftDrinks brand. We intentionally do NOT read
  // the Prismic meta fields here because that CMS document still holds the
  // legacy "Fizzi" title/description/image, which would leak into link previews.
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      type: "website",
      siteName: "SoftDrinks",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return <SliceZone slices={home.data.slices} components={components} />;
}
