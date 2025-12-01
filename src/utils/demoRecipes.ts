import { Recipe } from "@/types/recipe";

export const DEMO_RECIPES: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "Creamy Paneer Butter Masala",
    description: "Rich, velvety North Indian curry with soft paneer cubes in a tomato-cashew gravy. Comfort food at its finest!",
    ingredients: [
      "400g paneer, cubed",
      "3 large tomatoes, chopped",
      "1/2 cup cashews, soaked",
      "2 onions, sliced",
      "3 tbsp butter",
      "1 cup heavy cream",
      "2 tsp garam masala",
      "1 tsp red chili powder",
      "1 tsp kasuri methi",
      "2 tbsp ginger-garlic paste",
      "Salt to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Soak cashews in warm water for 20 minutes",
      "Blend tomatoes and soaked cashews into smooth paste",
      "Heat butter in pan, sauté onions until golden",
      "Add ginger-garlic paste, cook for 2 minutes",
      "Pour tomato-cashew paste, cook for 10 minutes",
      "Add spices, salt, and kasuri methi",
      "Stir in cream and paneer cubes",
      "Simmer for 5 minutes until paneer is soft",
      "Garnish with cilantro and serve with naan"
    ],
    servings: 4,
    cookTime: "45 mins",
    tags: ["Indian", "comfort food", "creamy", "dinner"]
  },
  {
    title: "Spicy Thai Basil Tofu Stir-Fry",
    description: "Quick and fiery Thai-style stir-fry with crispy tofu, fresh basil, and a sweet-spicy sauce. Ready in 20 minutes!",
    ingredients: [
      "400g firm tofu, pressed and cubed",
      "2 cups fresh Thai basil leaves",
      "3 cloves garlic, minced",
      "2-3 Thai chilies, sliced",
      "1 red bell pepper, sliced",
      "1 onion, sliced",
      "3 tbsp soy sauce",
      "2 tbsp oyster sauce (vegetarian)",
      "1 tbsp brown sugar",
      "2 tbsp vegetable oil",
      "1 tsp cornstarch",
      "Steamed jasmine rice to serve"
    ],
    instructions: [
      "Press tofu for 15 minutes, then cube and pat dry",
      "Mix soy sauce, veg oyster sauce, sugar, and cornstarch",
      "Heat oil in wok over high heat",
      "Fry tofu until golden and crispy, set aside",
      "Stir-fry garlic and chilies for 30 seconds",
      "Add onion and bell pepper, cook 2 minutes",
      "Return tofu to wok, pour sauce",
      "Toss everything until well coated",
      "Remove from heat, stir in fresh basil",
      "Serve immediately over jasmine rice"
    ],
    servings: 3,
    cookTime: "20 mins",
    tags: ["Thai", "quick", "spicy", "Asian"]
  },
  {
    title: "Mediterranean Lentil Soup",
    description: "Hearty, warming soup packed with protein-rich lentils, veggies, and aromatic herbs. Perfect for cozy evenings!",
    ingredients: [
      "1 cup red lentils, rinsed",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "1 onion, chopped",
      "4 cloves garlic, minced",
      "6 cups vegetable broth",
      "1 can diced tomatoes",
      "2 tsp cumin powder",
      "1 tsp smoked paprika",
      "1/2 tsp turmeric",
      "2 tbsp olive oil",
      "Juice of 1 lemon",
      "Fresh parsley, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in large pot over medium heat",
      "Sauté onion, carrots, and celery until soft (5 min)",
      "Add garlic and spices, cook for 1 minute",
      "Pour in lentils, tomatoes, and vegetable broth",
      "Bring to boil, then reduce to simmer",
      "Cook for 25-30 minutes until lentils are tender",
      "Stir in lemon juice and season with salt/pepper",
      "Blend half the soup for creamy texture (optional)",
      "Garnish with fresh parsley before serving",
      "Serve with crusty bread"
    ],
    servings: 6,
    cookTime: "40 mins",
    tags: ["Mediterranean", "healthy", "soup", "comfort food"]
  }
];
