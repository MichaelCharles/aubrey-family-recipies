import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import highlightJs from "markdown-it-highlightjs";
import path from "path";

const recipesDirectory = path.join(process.cwd(), "content/recipes");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmpty(value: any) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    JSON.stringify(value) === "{}" ||
    JSON.stringify(value) === "[]"
  );
}

export type MatterResultData = {
  title: string;
  by: string;
  slug: string;
  tags: string[];
  category: string;
  coverImage: string;
  imageSource: string;
  imageWanted?: boolean;
};

const emptyMatterResultData: MatterResultData = {
  title: "",
  by: "",
  slug: "",
  tags: [],
  category: "",
  coverImage: "",
  imageSource: "",
  imageWanted: false,
};

export function getSortedRecipesData(): MatterResultData[] {
  const fileNames = fs.readdirSync(recipesDirectory);
  const allRecipesData = fileNames.map((fileName) => {
    const fullPath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the markdown file metadata using gray-matter
    const matterResult = matter(fileContents);

    return {
      ...matterResult.data,
      slug: fileName.replace(/\.md$/, ""),
    } as MatterResultData;
  });

  return allRecipesData.sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllRecipeSlugs() {
  const fileNames = fs.readdirSync(recipesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getRecipesByCategory(category: string): MatterResultData[] {
  const allRecipes = getSortedRecipesData();
  return allRecipes.filter((recipe) => recipe.category === category);
}

export function getRecipeData(slug: string): {
  contentHtml: string;
} & MatterResultData {
  const fullPath = path.join(recipesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Parse the markdown file metadata using gray-matter
  const matterResult = matter(fileContents);

  // Initialize markdown-it with plugins
  const md = new MarkdownIt({
    html: true,
    linkify: false,
    typographer: false,
  });
  md.use(highlightJs, { inline: true });

  const contentHtml = md.render(matterResult.content);

  return {
    contentHtml,
    title: matterResult.data.title,
    by: matterResult.data.by,
    slug: matterResult.data.slug,
    tags: matterResult.data.tags || [],
    category: matterResult.data.category,
    coverImage: matterResult.data.coverImage,
    imageSource: matterResult.data.imageSource,
    imageWanted: matterResult.data.imageWanted,
  };
}

export function getCategories(): string[] {
  const allRecipes = getSortedRecipesData();
  const categories = new Set(allRecipes.map((recipe) => recipe.category));
  return Array.from(categories).sort();
}

export function getRecipesByTag(tag: string): MatterResultData[] {
  const allRecipes = getSortedRecipesData();
  return allRecipes.filter((recipe) => recipe.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const allRecipes = getSortedRecipesData();
  const tags = new Set(allRecipes.flatMap((recipe) => recipe.tags || []));
  return Array.from(tags).sort();
}
