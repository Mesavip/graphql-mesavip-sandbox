import 'reflect-metadata';
import { buildSchema, registerEnumType } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { context } from 'context';
import { CountStatus, SortOrder, UserResolver } from '@resolvers/UserResolver';
import { RatingResolver } from '@resolvers/RatingResolver';

const app = async () => {
  registerEnumType(SortOrder, {
    name: 'SortOrder',
  });

  registerEnumType(CountStatus, {
    name: 'CountStatus',
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, RatingResolver],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: localhost:4000')
  );
};

app();
