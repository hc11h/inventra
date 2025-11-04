import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ORG_ADMIN', 'ORG_MANAGER')
  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ORG_ADMIN', 'ORG_MANAGER', 'ORG_STAFF')
  @Query(() => UserModel, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ORG_ADMIN')
  @Mutation(() => UserModel)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ORG_ADMIN', 'ORG_MANAGER')
  @Mutation(() => UserModel)
  updateUser(@Args('input') input: UpdateUserInput) {
    const { id, ...data } = input;
    return this.userService.update(id, data);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ORG_ADMIN')
  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}


