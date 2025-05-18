'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      slug
      tags
      image {
        url
      }
    }
  }
`;

type Recipe = {
  id: string;
  title: string;
  slug: string;
  image?: { url: string };
  tags?: string;
};

export default function RecipeList() {
  const { data, loading, error } = useQuery(GET_RECIPES);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <p className="p-6 text-gray-600">Loading recipes...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allRecipes: Recipe[] = data.recipes;

  const allTags = Array.from(
    new Set(
      allRecipes
        .flatMap((recipe) => recipe.tags?.split('\n') ?? [])
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesTag = activeTag
        ? recipe.tags?.split('\n').some((tag) => tag.trim() === activeTag)
        : true;

    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
    });


  return (
    <div className="p-6">
       <div className="mb-4">
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 border border-white bg-gray-100 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#30fe6c] placeholder-gray-400"
            />
        </div>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <span className="font-medium">Filter by tag:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm border cursor-pointer
                ${activeTag === tag
                ? 'bg-[#30fe6c] text-black border-transparent'
                : 'bg-transparent text-white border-white hover:bg-white hover:text-black'}
            `}
            >
            #{tag}
        </button>

        ))}
        {activeTag && (
          <button
            onClick={() => setActiveTag(null)}
            className="ml-2 text-sm text-red-500 underline cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipe/${recipe.slug}`}
            className="block border rounded-lg overflow-hidden bg-white hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <Image
                src={recipe.image?.url || '/images/placeholder.jpg'}
                alt={recipe.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                priority={false}
                unoptimized={false}
            />

            <div className="p-4 bg-white bg-opacity-80 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                {recipe.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
