import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from '../users/models/user.model';

@ObjectType()
class AuthPayload {
  @Field(() => String)
  accessToken!: string;

  @Field(() => UserModel)
  user!: UserModel;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation(() => UserModel)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    return this.authService.register(email, password, name);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}


