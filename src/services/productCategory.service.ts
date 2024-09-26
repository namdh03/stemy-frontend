import { graphql } from '~graphql';

export const GetProductCategories = graphql(`
  query GetProductCategoriesQuery {
    productCategories {
      id
      name
      title
    }
  }
`);
