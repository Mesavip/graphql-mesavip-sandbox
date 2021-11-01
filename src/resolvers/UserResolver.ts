import 'reflect-metadata';
import { User } from '@models/User';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from 'context';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }
}
