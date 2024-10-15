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
    "\n  query GetOrders($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    orders(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {\n      items {\n        id\n        phone\n        receiveTime\n        shipTime\n        status\n        totalPrice\n        orderItems {\n          id\n          quantity\n          productPrice\n          hasLab\n          labPrice\n          product {\n            name\n          }\n        }\n        payment {\n          time\n          provider\n        }\n        fullName\n        address\n        createdAt\n      }\n      pageInfo {\n        currentItem\n        currentPage\n        totalItem\n        totalPage\n      }\n    }\n  }\n": types.GetOrdersDocument,
    "\n  query GetOrderById($id: Float!) {\n    order(id: $id) {\n      id\n      phone\n      receiveTime\n      shipTime\n      status\n      totalPrice\n      orderItems {\n        id\n        quantity\n        productPrice\n        hasLab\n        labPrice\n        product {\n          name\n        }\n      }\n      payment {\n        time\n        provider\n      }\n      fullName\n      address\n      createdAt\n    }\n  }\n": types.GetOrderByIdDocument,
    "\n  query GetTableProducts($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    products(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {\n      items {\n        id\n        name\n        price\n        description\n        images {\n          id\n          url\n        }\n        categories {\n          id\n          name\n        }\n      }\n      pageInfo {\n        totalItem\n        totalPage\n        currentItem\n        currentPage\n      }\n    }\n  }\n": types.GetTableProductsDocument,
    "\n  mutation CreateProduct($input: ProductInput!, $images: [File!]!, $lab: File!) {\n    createProduct(input: $input, images: $images, lab: $lab) {\n      id\n      name\n      price\n      description\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  query GetProductById($id: Float!) {\n    product(id: $id) {\n      id\n      name\n      price\n      description\n      rating\n      sold\n      images {\n        id\n        url\n      }\n      categories {\n        id\n        name\n      }\n      lab {\n        id\n        price\n        url\n      }\n    }\n  }\n": types.GetProductByIdDocument,
    "\n  mutation DeleteProduct($id: Float!) {\n    deleteProduct(id: $id) {\n      id\n    }\n  }\n": types.DeleteProductDocument,
    "\n  query GetProductCategoriesQuery {\n    productCategories {\n      id\n      name\n      title\n      type\n    }\n  }\n": types.GetProductCategoriesQueryDocument,
    "\n  query GetProductCategoryById($categoryId: Float!) {\n    productCategory(id: $categoryId) {\n      id\n      name\n      title\n      type\n    }\n  }\n": types.GetProductCategoryByIdDocument,
    "\n  query GetTickets($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    tickets(currentItem: $currentItem, currentPage: $currentPage, order: $order, sort: $sort) {\n      items {\n        id\n        status\n        orderItem {\n          order {\n            id\n          }\n        }\n        createdAt\n        closedAt\n        sender {\n          email\n          fullName\n        }\n        replier {\n          email\n          fullName\n        }\n        title\n        category {\n          name\n        }\n        rating\n      }\n      pageInfo {\n        totalItem\n        totalPage\n        currentItem\n        currentPage\n      }\n    }\n  }\n": types.GetTicketsDocument,
    "\n  query GetTicketByid($ticketId: Float!) {\n    ticket(ticketId: $ticketId) {\n      id\n      replierComment\n      senderComment\n      status\n      orderItem {\n        product {\n          name\n        }\n        order {\n          id\n        }\n      }\n      sender {\n        fullName\n        email\n      }\n      category {\n        id\n        name\n      }\n      updatedAt\n      title\n      createdAt\n      closedAt\n      rating\n      replier {\n        fullName\n        email\n      }\n      images {\n        id\n        url\n      }\n    }\n  }\n": types.GetTicketByidDocument,
    "\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n": types.LoginMutationDocument,
    "\n  query MeQuery {\n    me {\n      email\n      fullName\n      id\n      phone\n      role\n      status\n    }\n  }\n": types.MeQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrders($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    orders(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {\n      items {\n        id\n        phone\n        receiveTime\n        shipTime\n        status\n        totalPrice\n        orderItems {\n          id\n          quantity\n          productPrice\n          hasLab\n          labPrice\n          product {\n            name\n          }\n        }\n        payment {\n          time\n          provider\n        }\n        fullName\n        address\n        createdAt\n      }\n      pageInfo {\n        currentItem\n        currentPage\n        totalItem\n        totalPage\n      }\n    }\n  }\n"): typeof import('./graphql').GetOrdersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderById($id: Float!) {\n    order(id: $id) {\n      id\n      phone\n      receiveTime\n      shipTime\n      status\n      totalPrice\n      orderItems {\n        id\n        quantity\n        productPrice\n        hasLab\n        labPrice\n        product {\n          name\n        }\n      }\n      payment {\n        time\n        provider\n      }\n      fullName\n      address\n      createdAt\n    }\n  }\n"): typeof import('./graphql').GetOrderByIdDocument;
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
export function graphql(source: "\n  query GetProductById($id: Float!) {\n    product(id: $id) {\n      id\n      name\n      price\n      description\n      rating\n      sold\n      images {\n        id\n        url\n      }\n      categories {\n        id\n        name\n      }\n      lab {\n        id\n        price\n        url\n      }\n    }\n  }\n"): typeof import('./graphql').GetProductByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProduct($id: Float!) {\n    deleteProduct(id: $id) {\n      id\n    }\n  }\n"): typeof import('./graphql').DeleteProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductCategoriesQuery {\n    productCategories {\n      id\n      name\n      title\n      type\n    }\n  }\n"): typeof import('./graphql').GetProductCategoriesQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductCategoryById($categoryId: Float!) {\n    productCategory(id: $categoryId) {\n      id\n      name\n      title\n      type\n    }\n  }\n"): typeof import('./graphql').GetProductCategoryByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTickets($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {\n    tickets(currentItem: $currentItem, currentPage: $currentPage, order: $order, sort: $sort) {\n      items {\n        id\n        status\n        orderItem {\n          order {\n            id\n          }\n        }\n        createdAt\n        closedAt\n        sender {\n          email\n          fullName\n        }\n        replier {\n          email\n          fullName\n        }\n        title\n        category {\n          name\n        }\n        rating\n      }\n      pageInfo {\n        totalItem\n        totalPage\n        currentItem\n        currentPage\n      }\n    }\n  }\n"): typeof import('./graphql').GetTicketsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTicketByid($ticketId: Float!) {\n    ticket(ticketId: $ticketId) {\n      id\n      replierComment\n      senderComment\n      status\n      orderItem {\n        product {\n          name\n        }\n        order {\n          id\n        }\n      }\n      sender {\n        fullName\n        email\n      }\n      category {\n        id\n        name\n      }\n      updatedAt\n      title\n      createdAt\n      closedAt\n      rating\n      replier {\n        fullName\n        email\n      }\n      images {\n        id\n        url\n      }\n    }\n  }\n"): typeof import('./graphql').GetTicketByidDocument;
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
