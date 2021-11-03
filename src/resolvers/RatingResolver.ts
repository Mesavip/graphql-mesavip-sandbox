import { User } from '.prisma/client';
import { Rating } from '@models/Rating';
import { Restaurant } from '@models/Restaurant';
import { Context } from 'context';
import {
  Ctx,
  FieldResolver,
  InputType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

@Resolver(Rating)
export class RatingResolver {
  @FieldResolver()
  async user(
    @Root() rating: Rating,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return ctx.prisma.rating
      .findUnique({
        where: {
          id: rating.id,
        },
      })
      .user();
  }

  @FieldResolver()
  async restaurant(
    @Root() rating: Rating,
    @Ctx() ctx: Context
  ): Promise<Restaurant | null> {
    return ctx.prisma.rating
      .findUnique({
        where: {
          id: rating.id,
        },
      })
      .restaurant();
  }

  @Query(() => [Rating])
  async allRatings(@Ctx() ctx: Context) {
    return ctx.prisma.rating.findMany();
  }
}
