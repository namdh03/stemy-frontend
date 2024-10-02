import { graphql } from '~graphql';

export const GetTicketsQuery = graphql(`
  query GetTickets($currentPage: Int!, $currentItem: Int!, $sort: String!, $order: SortOrder!) {
    tickets(currentItem: $currentItem, currentPage: $currentPage, order: $order, sort: $sort) {
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
`);
