/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getURL = /* GraphQL */ `
  query GetURL($id: ID!) {
    getURL(id: $id) {
      id
      original
      shortened
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listURLS = /* GraphQL */ `
  query ListURLS(
    $filter: ModelURLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listURLS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        original
        shortened
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncURLS = /* GraphQL */ `
  query SyncURLS(
    $filter: ModelURLFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncURLS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        original
        shortened
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
