import { Metadata } from "next";

export function generatePageMetadata(
  title: string,
  description: string,
  keywords?: string[]
): Metadata {
  return {
    title: `${title} | OFARO TECH`,
    description,
    keywords: keywords || [
      "OFARO TECH",
      "transformation digitale",
      "développement web",
      "Togo",
    ],
    openGraph: {
      title: `${title} | OFARO TECH`,
      description,
      type: "website",
    },
  };
}
