import { IsEmail } from 'class-validator';
import 'reflect-metadata';
import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  ObjectTypeOptions,
} from 'type-graphql';
import { Rating } from './Rating';

@ObjectType()
class Count {
  @Field()
  ratings: number;
}

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

  @Field((type) => [Rating], { nullable: true })
  ratings?: [Rating] | null;

  @Field((type) => Count, { nullable: true })
  _count?: Count;
}
