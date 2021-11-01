import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { UserResolver } from '@resolvers/UserResolver';
import { context } from 'context';

const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: localhost:4000')
  );
};

app();
