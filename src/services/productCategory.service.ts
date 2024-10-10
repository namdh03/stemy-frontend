import { graphql } from '~graphql';

export const GetProductCategories = graphql(`
  query GetProductCategoriesQuery {
    productCategories {
      id
      name
      title
      type
    }
  }
`);

export const GetProductCategoryById = graphql(`
  query GetProductCategoryById($categoryId: Float!) {
    productCategory(id: $categoryId) {
      id
      name
      title
      type
    }
  }
`);
