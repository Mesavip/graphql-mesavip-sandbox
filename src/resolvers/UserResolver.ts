import 'reflect-metadata';
import { User } from '@models/User';
import { Rating } from '@models/Rating';
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
import { Context } from 'context';
import { randomUUID } from 'crypto';

@InputType()
class SignUpUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  password_hash: string;
}

@InputType()
class UserFieldsCount {
  @Field((type) => CountStatus)
  cpf: CountStatus;
}

@InputType()
class orderBy {
  @Field((type) => SortOrder)
  name: SortOrder;
}

export enum CountStatus {
  true = 'true',
  false = 'false',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async ratings(@Root() user: User, @Ctx() ctx: Context): Promise<Rating[]> {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .ratings();
  }

  @Query(() => [User])
  async testingPrisma(
    @Arg('count', { nullable: true }) count: boolean,
    @Arg('testCount'): testCount:
    ObjectType()
    @Field()
    ratings: string | undefined

    @Field()
    comments: string | undefined

    // TEST IT ON THE RATINGS RESOLVER
    ,
    @Ctx() ctx: Context
  ) {
    const doit = count
      ? {
          _count: {
            select: {
              ratings: true,
            },
          },
        }
      : null;

    const user = await ctx.prisma.user.findMany({
      where: {
        email: 'daniel@gmail.com',
      },
      include: doit,
      // include: {
      //   _count: {
      //     select: {
      //       ratings: true,
      //     },
      //   },
      // },
    });

    console.log(user);

    return user;
  }

  @Query(() => [User])
  async@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @Mutation((returns) => User)
  async signupUser(
    @Arg('user') user: SignUpUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return ctx.prisma.user.create({
      data: {
        id: randomUUID(),
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password_hash: user.password_hash,
      },
    });
  }
}
