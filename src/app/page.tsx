export const metadata = {
  title: 'Home | My Vegetarian Recipes',
  description: 'Browse delicious and easy-to-follow recipes for vegetarian meals.',
};

import RecipeList from '@/components/RecipeList';

export default function HomePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center text-white-800 mt-8 mb-4">My Vegetarian Recipes</h1>
      <RecipeList />
    </main>
  );
}
