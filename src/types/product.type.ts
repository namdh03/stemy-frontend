export type ProductCategory = {
  id: string;
  name: string;
};

export type TableProductType = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: ProductCategory;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
};
