import { Resolver, Query } from '@nestjs/graphql';
import { formatGreeting } from '@my-app/utils';

@Resolver()
export class AppResolver {
  @Query(() => String)
  getHello(): string {
    return formatGreeting('from NestJS API');
  }
}