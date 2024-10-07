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

export const GetProductByIdQuery = graphql(`
  query GetProductById($id: Float!) {
    product(id: $id) {
      id
      name
      price
      description
      rating
      sold
      images {
        id
        url
      }
      categories {
        id
        name
      }
      lab {
        id
        price
        url
      }
    }
  }
`);

export const DeleteProductMutation = graphql(`
  mutation DeleteProduct($id: Float!) {
    deleteProduct(id: $id) {
      id
    }
  }
`);
