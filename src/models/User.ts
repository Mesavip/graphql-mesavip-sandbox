import { IsEmail } from 'class-validator';
import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String)
  cpf: string;

  @Field((type) => String)
  password_hash: string;

  @Field((type) => String)
  created_at: string;

  @Field((type) => String)
  updated_at: string;
}
