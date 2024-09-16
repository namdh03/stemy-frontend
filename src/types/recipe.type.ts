import { LevelCook } from '~utils/enums';

import { CategoryItem } from './category.type';
import { FoodStyleType } from './food-style.type';
import { IngredientType } from './ingredient.type';
import { MealKitBody, MealKitItem } from './meal-kit.type';
import { NutritionType } from './nutrition.type';
import { SuccessResponse } from './response.type';
import { TableResponseState } from './table.type';

export type ShopRecipeType = {
  id: string;
  name: string;
  slug: string;
  foodStyle: string;
  mainImage: string;
  subImage: string;
  level: LevelCook;
  time: number;
  price: number;
  star: number;
  sold: number;
};

export type ShopRecipeResponse = SuccessResponse<{
  recipes: ShopRecipeType[];
  itemTotal: number;
  pageIndex: number;
  pageSize: number;
  pageTotal: number;
}>;

export type RecipeIngredientType = {
  id?: string;
  name: string;
  amount: number;
  unit: string;
  price: number;
};

export type RecipeNutritionType = {
  id?: string;
  name: string;
  amount: number;
  unit: string;
};

export type TableRecipeType = {
  id: string;
  name: string;
  time: number;
  level: LevelCook;
  category: {
    id: string;
    name: string;
  };
  slug: string;
  image: string;
  totalmealkit: number;
};

export type TableViewRecipeType = {
  name: string;
  foodStyles: Record<string, string>;
  videoUrl: string;
  images: string[];
  time: number;
  steps: string;
  category: string;
  ingredients: RecipeIngredientType[];
  nutrition: RecipeNutritionType[];
  mealKits: MealKitItem[];
  level: LevelCook;
  price: number;
  status: boolean;
};

export type ShopRecipeDetail = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  star: number;
  sold: number;
  totalFeedback: number;
};

export type UpdateIngredientRecipe = {
  price: number;
  ingredient_id: string;
  amount: number;
  unit_id: string;
  id?: string | undefined;
};

export type UpdateNutritionRecipe = {
  nutrition_id: string;
  amount: number;
  unit_id: string;
  id?: string | undefined;
};

export type UpdateIngredientBody = {
  ingredients: UpdateIngredientRecipe[];
  removeIds: string[];
};

export type UpdateNutritionBody = {
  nutrition: UpdateNutritionRecipe[];
  removeIds: string[];
};

export type UpdateMealKitBody = {
  mealKits: MealKitBody[];
  removeIds: string[];
};

export type UpdateRecipeBody = {
  name: string;
  foodStyles: string[];
  videoUrl: string;
  time: number;
  steps: string;
  category: string;
  level: string;
};

export type RecipeDetailType = {
  id: string;
  slug: string;
  name: string;
  star: number;
  sold: number;
  totalFeedback: number;
  images: string[];
  level: LevelCook;
  time: number;
  steps: string;
  videoUrl: string;
  category: CategoryItem;
  mealKits: MealKitItem[]; // similar mealKits at cart api
};

export type RecipeDetailState = {
  recipe?: RecipeDetailType;
  foodStyles?: FoodStyleType[];
  ingredients?: IngredientType[];
  nutritions?: NutritionType[];
};

export type ShopRecipeDetailResponse = SuccessResponse<TableViewRecipeType>;

export type TableRecipeResponse = TableResponseState<TableRecipeType>;

export type ModRecipeDetailResponse = SuccessResponse<TableViewRecipeType>;

export type CusRecipeDetailResponse = SuccessResponse<RecipeDetailState>;

export type TableRecipeFilter = {
  name: string;
  level: string;
  category: string;
};
