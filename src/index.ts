import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { context } from 'context';
import { UserResolver } from '@resolvers/UserResolver';
import { RatingResolver } from '@resolvers/RatingResolver';

const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RatingResolver],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: localhost:4000')
  );
};

app();
