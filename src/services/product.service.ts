import { graphql } from '~graphql';

export const GetProductTableQuery = graphql(`
  query GetTableProducts($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
    products(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {
      items {
        id
        name
        price
        description
        images {
          id
          url
        }
        categories {
          id
          name
        }
      }
      pageInfo {
        totalItem
        totalPage
        currentItem
        currentPage
      }
    }
  }
`);

export const CreateProductMutation = graphql(`
  mutation CreateProduct($input: ProductInput!, $images: [File!]!, $lab: File!) {
    createProduct(input: $input, images: $images, lab: $lab) {
      id
      name
      price
      description
      categories {
        id
        name
      }
    }
  }
`);
