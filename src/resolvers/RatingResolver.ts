import { User } from '.prisma/client';
import { Rating } from '@models/Rating';
import { Restaurant } from '@models/Restaurant';
import { Context } from 'context';
import { randomUUID } from 'crypto';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

@InputType()
class CreateRatingInput {
  @Field()
  rating: number;
}

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

  @Query(() => [Rating])
  async userRatings(
    @Arg('user_id') user_id: string,
    @Arg('restaurant_id') restaurant_id: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.rating.findMany({
      where: {
        user_id,
        restaurant_id,
      },
    });
  }

  @Mutation((returns) => Rating)
  async createRating(
    @Arg('rating') rating: CreateRatingInput,
    @Arg('user_id') user_id: string,
    @Arg('restaurant_id') restaurant_id: string,
    @Ctx() ctx: Context
  ): Promise<Rating> {
    return ctx.prisma.rating.create({
      data: {
        id: randomUUID(),
        rating: rating.rating,
        user: {
          connect: {
            id: user_id,
          },
        },
        restaurant: {
          connect: {
            id: restaurant_id,
          },
        },
      },
    });
  }
}
