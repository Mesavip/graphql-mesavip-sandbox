import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { Rating } from './Rating';

@ObjectType()
export class Restaurant {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => [Rating], { nullable: true })
  ratings?: [Rating] | null;
}
