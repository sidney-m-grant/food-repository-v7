import { hookstate } from "@hookstate/core";

export type StepBlock = {
  for: string;
  steps: RecipeStep[];
  blockNumber: number;
};

export type IngredientBlock = {
  for: string;
  ingredients: Ingredient[];
  blockNumber: number;
};

export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
  id: number;
};

export type Recipe = {
  recipeName: string;
  docId?: string;
  stepList: StepBlock[];
  ingredientList: IngredientBlock[];
  imgPath: string;
  servesAmount: string;
  source: string;
  briefDescription: string;
  cookBook: string;
};

export type RecipeStep = {
  stepText: string;
  stepNumber: number;
};

const currentRecipe: Recipe = {
  recipeName: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  imgPath: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const editedRecipe: Recipe = {
  recipeName: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  imgPath: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const inputRecipe: Recipe = {
  recipeName: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  imgPath: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const socialRecipe: Recipe = {
  recipeName: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  imgPath: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const allRecipes: Recipe[] = [];

export const store = hookstate({
  currentRecipe: currentRecipe,
  editedRecipe: editedRecipe,
  inputRecipe: inputRecipe,
  socialRecipe: socialRecipe,
  editedImagePreview: "",
  inputImagePreview: "",
  allRecipes: allRecipes,
});
