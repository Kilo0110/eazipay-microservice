import gql from 'graphql-tag';

const authTypeDefs = gql`
  extend type Mutation {
    createUser(input: CreateUserInput!): User
    logIn(input: LoginInput!): String
  }
`;

export default authTypeDefs;
