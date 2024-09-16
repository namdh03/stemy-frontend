import { TableResponseState } from './table.type';

export type ExtraSpice = {
  id?: string;
  name: string;
  image: string;
  price: number;
};

export type ExtraSpiceType = {
  id?: string;
  name: string;
  price: number;
};

export type MealKitItem = {
  id: string;
  status: boolean;
  price: number;
  serving: number;
  extraSpice: ExtraSpice | null;
};

export type MealKitType = {
  id?: string;
  price: number;
  serving: number;
};

export type MealKitBody = {
  mealKit: MealKitType;
  extraSpice: ExtraSpiceType;
};

export type TableMealKitType = {
  id: string;
  recipeName: string;
  recipeId: string;
  serving: number;
  price: number;
  status: boolean;
  extraSpice: ExtraSpice | null;
  image: string;
  totalFeedback: number;
  averageRating: number;
};

export type TableMealKitResponse = TableResponseState<TableMealKitType>;

export type TableUnitFilter = {
  name: string;
  status: string;
};

export type TableUnitSorting = {
  name: string;
  status: string;
  serving: string;
  price: string;
  extraSpice_name: string;
  extraSpice_price: string;
};
