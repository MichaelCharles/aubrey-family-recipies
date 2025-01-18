"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Recipe = {
  title: string;
  by: string;
  slug: string;
  tags: string[];
  category: string;
  coverImage: string;
  imageSource: string;
  imageWanted?: boolean;
};

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <div className="relative w-full max-w-2xl mx-auto mb-8">
    <input
      type="text"
      placeholder="Search recipes by title, category, tags, or author..."
      className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      onChange={(e) => onSearch(e.target.value)}
    />
    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
  </div>
);

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="relative h-48 w-full">
      <Image
        src={recipe.coverImage}
        alt={recipe.title}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <CardHeader className="p-4">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-sm text-gray-600">By {recipe.by}</p>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          {recipe.category}
        </span>
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

const Homepage = ({ recipes }: { recipes: Recipe[] }) => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const searchableText = [
        recipe.title,
        recipe.by,
        recipe.category,
        ...recipe.tags,
      ]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(lowercaseQuery);
    });
    setFilteredRecipes(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cookbook Image */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Aubrey Family Recipes
              </h1>
              <p className="text-purple-100 text-lg mb-6">
                A digital collection of our cherished family recipes, lovingly
                curated by Debbie Aubrey
              </p>
              <p className="text-purple-200 italic">
                Continuing the legacy of sharing meals and memories
              </p>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/og-image.png"
                alt="Original Aubrey Family Recipe Book"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link href={`/recipes/${recipe.slug}`} key={recipe.slug}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
