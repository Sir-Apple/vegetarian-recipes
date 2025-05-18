import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import Image from 'next/image';

const GET_RECIPE_BY_SLUG = gql`
  query GetRecipeBySlug($slug: String!) {
    recipe(where: { slug: $slug }) {
      title
      image {
        url
      }
      ingredients
      instructions {
        html
      }
      tags
    }
  }
`;

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { data } = await client.query({
    query: GET_RECIPE_BY_SLUG,
    variables: { slug: params.slug },
  });

  const recipe = data.recipe;

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <Image
            src={recipe.image?.url || '/images/placeholder.jpg'}
            alt={recipe.title}
            width={800}
            height={360}
            className="w-full h-60 object-cover rounded mb-6"
            priority
        />

      <h2 className="text-xl font-semibold mt-4 mb-2">Ingredients</h2>
      <ul className="list-disc ml-6 space-y-1">
        {recipe.ingredients.split('\n').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <div
        className="prose prose-sm sm:prose lg:prose-lg mt-2"
        dangerouslySetInnerHTML={{ __html: recipe.instructions.html }}
      />

      {recipe.tags?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm uppercase text-gray-500 mb-1">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.split('\n').map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
