// app/page.tsx
import Homepage from "@/components/Homepage";
import { getCategories, getSortedRecipesData } from "@/lib/recipes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aubrey Family Recipes",
  description:
    "A collection of cherished family recipes passed down through generations of the Aubrey family.",
  openGraph: {
    title: "Aubrey Family Recipes",
    description:
      "A collection of cherished family recipes passed down through generations of the Aubrey family.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1083,
        height: 922,
        alt: "Aubrey Family Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aubrey Family Recipes",
    description:
      "A collection of cherished family recipes passed down through generations of the Aubrey family.",
  },
  keywords: [
    "recipes",
    "cooking",
    "family recipes",
    "Aubrey family",
    ...getCategories(),
  ],
};

export default function Page() {
  const recipes = getSortedRecipesData();
  return <Homepage recipes={recipes} />;
}
