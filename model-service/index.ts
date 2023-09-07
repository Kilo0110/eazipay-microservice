import { prop, modelOptions } from '@typegoose/typegoose';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { UserModel } from './schema';
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

async function bootstrap() {
  @modelOptions({ schemaOptions: { collection: 'users' } })
  class User {
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public email!: string;
  }

  const typeDefs = gql`
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable"]
      )
    type User @key(fields: "_id") {
      _id: ID! @federation__external
      username: String
      email: String
    }
  `;

  const resolvers = {
    Query: {
      me() {
        return users[0];
      },
    },
  };

  const users = [
    {
      id: '1',
      name: 'Ada Lovelace',
      birthDate: '1815-12-10',
      username: '@ada',
    },
    {
      id: '2',
      name: 'Alan Turing',
      birthDate: '1912-06-23',
      username: '@complete',
    },
  ];

  const schema = buildSubgraphSchema([{ typeDefs }]);

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
  });
  console.log(`🚀 Server started at ${url}`);
}

bootstrap();
