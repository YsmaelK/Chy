/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createEventOrder = /* GraphQL */ `
  mutation CreateEventOrder(
    $input: CreateEventOrderInput!
    $condition: ModelEventOrderConditionInput
  ) {
    createEventOrder(input: $input, condition: $condition) {
      id
      event {
        id
        title
        createdAt
        updatedAt
        eventOrderId
        __typename
      }
      createdAt
      updatedAt
      eventOrdersId
      eventOrderEventId
      __typename
    }
  }
`;
export const updateEventOrder = /* GraphQL */ `
  mutation UpdateEventOrder(
    $input: UpdateEventOrderInput!
    $condition: ModelEventOrderConditionInput
  ) {
    updateEventOrder(input: $input, condition: $condition) {
      id
      event {
        id
        title
        createdAt
        updatedAt
        eventOrderId
        __typename
      }
      createdAt
      updatedAt
      eventOrdersId
      eventOrderEventId
      __typename
    }
  }
`;
export const deleteEventOrder = /* GraphQL */ `
  mutation DeleteEventOrder(
    $input: DeleteEventOrderInput!
    $condition: ModelEventOrderConditionInput
  ) {
    deleteEventOrder(input: $input, condition: $condition) {
      id
      event {
        id
        title
        createdAt
        updatedAt
        eventOrderId
        __typename
      }
      createdAt
      updatedAt
      eventOrdersId
      eventOrderEventId
      __typename
    }
  }
`;
