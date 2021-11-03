import 'reflect-metadata';
import { User } from '@models/User';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
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

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
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
