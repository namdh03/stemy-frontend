import { graphql } from '~graphql';

export const GetOrdersQuery = graphql(`
  query GetOrders($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
    orders(currentPage: $currentPage, currentItem: $currentItem, sort: $sort, order: $order) {
      items {
        id
        phone
        receiveTime
        shipTime
        status
        totalPrice
        orderItems {
          id
          quantity
          productPrice
          hasLab
          labPrice
          product {
            name
          }
        }
        payment {
          time
          provider
        }
        fullName
        address
        createdAt
      }
      pageInfo {
        currentItem
        currentPage
        totalItem
        totalPage
      }
    }
  }
`);

export const GetOrderByIdQuery = graphql(`
  query GetOrderById($id: Float!) {
    order(id: $id) {
      id
      phone
      receiveTime
      shipTime
      status
      totalPrice
      orderItems {
        id
        quantity
        productPrice
        hasLab
        labPrice
        product {
          name
        }
      }
      payment {
        time
        provider
      }
      fullName
      address
      createdAt
    }
  }
`);

export const GetAllOrdersQuery = graphql(`
  query GetAllOrders {
    orders {
      items {
        id
        fullName
        status
        totalPrice
        createdAt
        orderItems {
          product {
            name
          }
          quantity
          productPrice
        }
      }
    }
  }
`);
