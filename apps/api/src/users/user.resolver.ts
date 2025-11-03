import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserModel, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => UserModel)
  updateUser(@Args('input') input: UpdateUserInput) {
    const { id, ...data } = input;
    return this.userService.update(id, data);
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}


