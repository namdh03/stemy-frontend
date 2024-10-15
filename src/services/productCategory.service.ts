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

export const CreateProductCategory = graphql(`
  mutation CreateProductCategory($input: ProductCategoryInput!) {
    createProductCategory(input: $input) {
      id
      name
      title
      type
    }
  }
`);

export const UpdateProductCategory = graphql(`
  mutation UpdateProductCategory($id: Float!, $input: ProductCategoryInput!) {
    updateProductCategory(id: $id, input: $input) {
      id
    }
  }
`);

export const DeleteProductCategory = graphql(`
  mutation DeleteProductCategory($id: Float!) {
    deleteProductCategory(id: $id) {
      id
    }
  }
`);
