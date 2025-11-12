import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  name: "Food Wagen",
  title: "Food Wagen - Delicious Food Delivered",
  description: "Order fresh, delicious meals from your favorite restaurants. Fast delivery, great taste, unbeatable convenience.",
  url: "https://foodwagen.vercel.app",
  mode: MODE.LIGHT,
  keywords: ["food delivery", "restaurant", "meals", "takeout", "delivery"],
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - ${siteConfig.name}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ${siteConfig.name}` : siteConfig.title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
};
