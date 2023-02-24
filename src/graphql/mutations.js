/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createURL = /* GraphQL */ `
  mutation CreateURL(
    $input: CreateURLInput!
    $condition: ModelURLConditionInput
  ) {
    createURL(input: $input, condition: $condition) {
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
export const updateURL = /* GraphQL */ `
  mutation UpdateURL(
    $input: UpdateURLInput!
    $condition: ModelURLConditionInput
  ) {
    updateURL(input: $input, condition: $condition) {
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
export const deleteURL = /* GraphQL */ `
  mutation DeleteURL(
    $input: DeleteURLInput!
    $condition: ModelURLConditionInput
  ) {
    deleteURL(input: $input, condition: $condition) {
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
