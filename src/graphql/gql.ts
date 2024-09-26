/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetTableProducts($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    products(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {\n      items {\n        id\n        name\n        price\n        description\n        images {\n          id\n          url\n        }\n        categories {\n          id\n          name\n        }\n      }\n      pageInfo {\n        totalItem\n        totalPage\n        currentItem\n        currentPage\n      }\n    }\n  }\n": types.GetTableProductsDocument,
    "\n  mutation CreateProduct($input: ProductInput!, $images: [File!]!, $lab: File!) {\n    createProduct(input: $input, images: $images, lab: $lab) {\n      id\n      name\n      price\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  query GetProductCategoriesQuery {\n    productCategories {\n      id\n      name\n      title\n    }\n  }\n": types.GetProductCategoriesQueryDocument,
    "\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n": types.LoginMutationDocument,
    "\n  query MeQuery {\n    me {\n      email\n      fullName\n      id\n      phone\n      role\n      status\n    }\n  }\n": types.MeQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTableProducts($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    products(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {\n      items {\n        id\n        name\n        price\n        description\n        images {\n          id\n          url\n        }\n        categories {\n          id\n          name\n        }\n      }\n      pageInfo {\n        totalItem\n        totalPage\n        currentItem\n        currentPage\n      }\n    }\n  }\n"): typeof import('./graphql').GetTableProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: ProductInput!, $images: [File!]!, $lab: File!) {\n    createProduct(input: $input, images: $images, lab: $lab) {\n      id\n      name\n      price\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductCategoriesQuery {\n    productCategories {\n      id\n      name\n      title\n    }\n  }\n"): typeof import('./graphql').GetProductCategoriesQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n"): typeof import('./graphql').LoginMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeQuery {\n    me {\n      email\n      fullName\n      id\n      phone\n      role\n      status\n    }\n  }\n"): typeof import('./graphql').MeQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
