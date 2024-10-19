import { graphql } from '~graphql';

export const GetTicketsQuery = graphql(`
  query GetTickets($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
    tickets(currentItem: $currentItem, currentPage: $currentPage, order: $order, sort: $sort) {
      items {
        id
        status
        orderItem {
          order {
            id
          }
        }
        createdAt
        closedAt
        sender {
          email
          fullName
        }
        replier {
          email
          fullName
        }
        title
        category {
          name
        }
        rating
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

export const GetTicketByIdQuery = graphql(`
  query GetTicketByid($ticketId: Float!) {
    ticket(ticketId: $ticketId) {
      id
      replierComment
      senderComment
      status
      orderItem {
        product {
          name
        }
        order {
          id
        }
      }
      sender {
        fullName
        email
      }
      category {
        id
        name
      }
      updatedAt
      title
      createdAt
      closedAt
      rating
      replier {
        fullName
        email
      }
      images {
        id
        url
      }
    }
  }
`);

export const GetAllTicketsQuery = graphql(`
  query GetAllTickets {
    tickets {
      items {
        id
        category {
          name
        }
        replier {
          id
          fullName
        }
        status
        updatedAt
        closedAt
        createdAt
        rating
      }
    }
  }
`);
