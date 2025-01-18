// app/recipes/[slug]/page.tsx
import RecipePage from "@/components/RecipePage";
import { getAllRecipeSlugs, getRecipeData } from "@/lib/recipes";
import { notFound } from "next/navigation";

// Add metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = getRecipeData(params.slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${recipe.title} | Aubrey Family Recipes`,
    description: `A family recipe for ${recipe.title} by ${recipe.by}`,
    openGraph: {
      title: recipe.title,
      description: `A family recipe for ${recipe.title} by ${recipe.by}`,
      images: [recipe.coverImage],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const recipe = getRecipeData(params.slug);

  // Handle cases where the recipe doesn't exist
  if (!recipe) {
    notFound();
  }

  return <RecipePage recipe={recipe} />;
}

// Generate static pages at build time
export async function generateStaticParams() {
  // This is handled by the getStaticPaths equivalent in the App Router
  // The helper function documentation shows getAllRecipeSlugs() returns the correct format
  const paths = getAllRecipeSlugs();
  return paths;
}
