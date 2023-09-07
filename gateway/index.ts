import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// import { resolvers } from './resolvers';
import { connectToMongo } from '../utils/mongo';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

async function bootstrap() {
  // Create gateway to merger both subgraph into one supergraph
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'user-service', url: 'http://localhost:4001' },
        { name: 'model-service', url: 'http://localhost:4002' },
      ],
    }),
  });
  // init express
  const app = express();
  app.use(cookieParser());

  // Create the apollo server
  const server = new ApolloServer({
    gateway,
  });

  await server.start();

  app.use('/graphql', json(), expressMiddleware(server));

  // app.listem on express server
  app.listen({ port: 4000 }, () => {
    console.log(`App is listening on http://localhost:4000`);
  });

  // connect to DB
  connectToMongo();
}

bootstrap();
