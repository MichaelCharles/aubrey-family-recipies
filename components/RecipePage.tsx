import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Tag, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RecipeProps = {
  title: string;
  by: string;
  slug: string;
  tags: string[];
  category: string;
  coverImage: string;
  imageSource: string;
  contentHtml: string;
};

const RecipePage = ({ recipe }: { recipe: RecipeProps }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-72 w-full">
            <Image
              src={recipe.coverImage}
              alt={recipe.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <p className="flex items-center">
                <Utensils className="h-4 w-4 mr-1" />
                By {recipe.by}
              </p>
              <p className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {recipe.category}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <Card>
          <CardContent className="p-6">
            <div
              className="prose prose-purple max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.contentHtml }}
            />
          </CardContent>
        </Card>

        {/* Image Attribution */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Image: {recipe.imageSource}
        </p>
      </div>
    </div>
  );
};

export default RecipePage;
