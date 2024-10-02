/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** File upload scalar type */
  File: { input: File; output: File; }
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  access_token: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTimeISO']['output'];
  hasLab: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user: User;
};

export enum CategoryType {
  Age = 'AGE',
  Product = 'PRODUCT',
  Topic = 'TOPIC'
}

export type CheckoutOrderInput = {
  vnp_Amount: Scalars['String']['input'];
  vnp_BankCode: Scalars['String']['input'];
  vnp_BankTranNo: Scalars['String']['input'];
  vnp_CardType: Scalars['String']['input'];
  vnp_OrderInfo: Scalars['String']['input'];
  vnp_PayDate: Scalars['String']['input'];
  vnp_ResponseCode: Scalars['String']['input'];
  vnp_SecureHash: Scalars['String']['input'];
  vnp_TmnCode: Scalars['String']['input'];
  vnp_TransactionNo: Scalars['String']['input'];
  vnp_TransactionStatus: Scalars['String']['input'];
  vnp_TxnRef: Scalars['String']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  orderItem: OrderItem;
  product: Product;
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Cart;
  checkoutOrder: Scalars['Boolean']['output'];
  createFeedback: Feedback;
  createOrder: Scalars['String']['output'];
  createProduct: Product;
  createTicket: Ticket;
  deleteCarts: Scalars['String']['output'];
  deleteProduct: Product;
  getTokenResetPassword: Scalars['String']['output'];
  login: AccessTokenResponse;
  loginWithGoogle: AccessTokenResponse;
  register: AccessTokenResponse;
  repayOrder: Scalars['String']['output'];
  replyTicket: Ticket;
  resetPassword: Scalars['String']['output'];
  sendResetPasswordOTP: Scalars['String']['output'];
  updateCart: Cart;
};


export type MutationAddToCartArgs = {
  hasLab: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};


export type MutationCheckoutOrderArgs = {
  input: CheckoutOrderInput;
};


export type MutationCreateFeedbackArgs = {
  note: Scalars['String']['input'];
  orderItemId: Scalars['Int']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationCreateOrderArgs = {
  address: Scalars['String']['input'];
  cartIds: Array<Scalars['Int']['input']>;
  paymentProvider: PaymentProvider;
  phone: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  images: Array<Scalars['File']['input']>;
  input: ProductInput;
  lab: Scalars['File']['input'];
};


export type MutationCreateTicketArgs = {
  categoryId: Scalars['Float']['input'];
  comment: Scalars['String']['input'];
  images?: Array<Scalars['File']['input']>;
  orderItemId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCartsArgs = {
  cartId: Array<Scalars['Int']['input']>;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float']['input'];
};


export type MutationGetTokenResetPasswordArgs = {
  OTPCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginWithGoogleArgs = {
  code: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationRepayOrderArgs = {
  orderId: Scalars['Float']['input'];
};


export type MutationReplyTicketArgs = {
  comment: Scalars['String']['input'];
  images?: Array<Scalars['File']['input']>;
  ticketId: Scalars['Float']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendResetPasswordOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCartArgs = {
  cartId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  orderItems: Array<OrderItem>;
  payment: OrderPaymentEmbeddable;
  phone: Scalars['String']['output'];
  status: OrderStatus;
  totalPrice: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTimeISO']['output'];
  hasLab: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  labPrice: Scalars['Int']['output'];
  order: Order;
  product: Product;
  productPrice: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type OrderPaymentEmbeddable = {
  __typename?: 'OrderPaymentEmbeddable';
  id: Scalars['String']['output'];
  provider: PaymentProvider;
};

export enum OrderStatus {
  Delivered = 'DELIVERED',
  Delivering = 'DELIVERING',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  currentItem: Scalars['Int']['output'];
  currentPage: Scalars['Int']['output'];
  totalItem: Scalars['Int']['output'];
  totalPage: Scalars['Int']['output'];
};

export enum PaymentProvider {
  Vnpay = 'VNPAY'
}

export type Product = {
  __typename?: 'Product';
  categories: Array<ProductCategory>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  feedbacks: Array<Feedback>;
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  lab?: Maybe<ProductLab>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  sold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  title: Scalars['String']['output'];
  type: CategoryType;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type ProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  labPrice: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type ProductLab = {
  __typename?: 'ProductLab';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type ProductsWithPaginationResponse = {
  __typename?: 'ProductsWithPaginationResponse';
  items: Array<Product>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  carts: Array<Cart>;
  countCart: Scalars['Float']['output'];
  me: User;
  product: Product;
  productCategories: Array<ProductCategory>;
  products: ProductsWithPaginationResponse;
  searchOrder: Array<Order>;
  tickets: TicketsWithPaginationResponse;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['Float']['input'];
};


export type QueryProductsArgs = {
  categoryIds?: Array<Scalars['Int']['input']>;
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  maxPrice?: Scalars['Int']['input'];
  maxRating?: Scalars['Int']['input'];
  minPrice?: Scalars['Int']['input'];
  minRating?: Scalars['Int']['input'];
  order?: SortOrder;
  search?: Scalars['String']['input'];
  sort?: Scalars['String']['input'];
};


export type QuerySearchOrderArgs = {
  search: Scalars['String']['input'];
};


export type QueryTicketsArgs = {
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  order?: SortOrder;
  sort?: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Manager = 'MANAGER',
  Staff = 'STAFF'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Ticket = {
  __typename?: 'Ticket';
  category: TicketCategory;
  closedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  images: Array<TicketImage>;
  orderItem: OrderItem;
  replier?: Maybe<User>;
  replierComment?: Maybe<Scalars['String']['output']>;
  sender: User;
  senderComment: Scalars['String']['output'];
  status: TicketStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type TicketCategory = {
  __typename?: 'TicketCategory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type TicketImage = {
  __typename?: 'TicketImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  owner: Role;
  ticket: Ticket;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export enum TicketStatus {
  Close = 'CLOSE',
  Open = 'OPEN'
}

export type TicketsWithPaginationResponse = {
  __typename?: 'TicketsWithPaginationResponse';
  items: Array<Ticket>;
  pageInfo: PageInfo;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  status: UserStatus;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Ban = 'BAN'
}

export type GetTableProductsQueryVariables = Exact<{
  currentPage: Scalars['Int']['input'];
  currentItem: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
  order: SortOrder;
}>;


export type GetTableProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductsWithPaginationResponse', items: Array<{ __typename?: 'Product', id: string, name: string, price: number, description: string, images: Array<{ __typename?: 'ProductImage', id: string, url: string }>, categories: Array<{ __typename?: 'ProductCategory', id: string, name: string }> }>, pageInfo: { __typename?: 'PageInfo', totalItem: number, totalPage: number, currentItem: number, currentPage: number } } };

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
  images: Array<Scalars['File']['input']> | Scalars['File']['input'];
  lab: Scalars['File']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, price: number, description: string, categories: Array<{ __typename?: 'ProductCategory', id: string, name: string }> } };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, price: number, description: string, images: Array<{ __typename?: 'ProductImage', id: string, url: string }>, categories: Array<{ __typename?: 'ProductCategory', id: string, name: string }>, lab?: { __typename?: 'ProductLab', id: string, price: number, url: string } | null } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'Product', id: string } };

export type GetProductCategoriesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductCategoriesQueryQuery = { __typename?: 'Query', productCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string, title: string }> };

export type GetTicketsQueryVariables = Exact<{
  currentPage: Scalars['Int']['input'];
  currentItem: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
  order: SortOrder;
}>;


export type GetTicketsQuery = { __typename?: 'Query', tickets: { __typename?: 'TicketsWithPaginationResponse', items: Array<{ __typename?: 'Ticket', id: string, replierComment?: string | null, senderComment: string, status: TicketStatus, title: string, orderItem: { __typename?: 'OrderItem', id: string }, category: { __typename?: 'TicketCategory', name: string, id: string } }>, pageInfo: { __typename?: 'PageInfo', totalItem: number, totalPage: number, currentItem: number, currentPage: number } } };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessTokenResponse', access_token: string } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', email: string, fullName: string, id: string, phone?: string | null, role: Role, status: UserStatus } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetTableProductsDocument = new TypedDocumentString(`
    query GetTableProducts($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
  products(
    currentPage: $currentPage
    currentItem: $currentItem
    sort: $sort
    order: $order
  ) {
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
    `) as unknown as TypedDocumentString<GetTableProductsQuery, GetTableProductsQueryVariables>;
export const CreateProductDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const GetProductByIdDocument = new TypedDocumentString(`
    query GetProductById($id: Float!) {
  product(id: $id) {
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
    lab {
      id
      price
      url
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const DeleteProductDocument = new TypedDocumentString(`
    mutation DeleteProduct($id: Float!) {
  deleteProduct(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetProductCategoriesQueryDocument = new TypedDocumentString(`
    query GetProductCategoriesQuery {
  productCategories {
    id
    name
    title
  }
}
    `) as unknown as TypedDocumentString<GetProductCategoriesQueryQuery, GetProductCategoriesQueryQueryVariables>;
export const GetTicketsDocument = new TypedDocumentString(`
    query GetTickets($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
  tickets(
    currentItem: $currentItem
    currentPage: $currentPage
    order: $order
    sort: $sort
  ) {
    items {
      id
      replierComment
      senderComment
      status
      orderItem {
        id
      }
      category {
        name
        id
      }
      title
    }
    pageInfo {
      totalItem
      totalPage
      currentItem
      currentPage
    }
  }
}
    `) as unknown as TypedDocumentString<GetTicketsQuery, GetTicketsQueryVariables>;
export const LoginMutationDocument = new TypedDocumentString(`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<LoginMutationMutation, LoginMutationMutationVariables>;
export const MeQueryDocument = new TypedDocumentString(`
    query MeQuery {
  me {
    email
    fullName
    id
    phone
    role
    status
  }
}
    `) as unknown as TypedDocumentString<MeQueryQuery, MeQueryQueryVariables>;