import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import AuthTypeDefs from './auth/schema';
// import { resolvers } from './resolver';
import { buildSchema } from '@typegoose/typegoose';
import AuthResolver from './auth/resolver';
// import { buildSchema } from 'type-graphql';

async function bootstrap() {
  const typeDefs = gql`
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )
    extend type User @key(fields: "_id") {
      _id: ID!
    }

    input CreateUserInput {
      name: String!
      email: String!
      password: String!
    }

    input LoginInput {
      email: String!
      password: String!
    }

    type Query {
      me: User # Add more query fields if needed
    }

    type Mutation {
      signUp(input: CreateUserInput!): User
      signIn(input: LoginInput!): String
    }

    ${AuthTypeDefs}
    # Include the authentication schema
  `;

  const resolvers = { ...AuthResolver };

  const schema = buildSubgraphSchema({ resolvers });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap();
