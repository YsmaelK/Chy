/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      order {
        id
        createdAt
        updatedAt
        eventOrdersId
        eventOrderEventId
        __typename
      }
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventOrderId
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $id: ID
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        createdAt
        updatedAt
        eventOrderId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
