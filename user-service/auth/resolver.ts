import { Mutation, Resolver, Arg, Ctx, Query } from 'type-graphql';
import { CreateUserInput, LoginInput, User } from '../../model-service/schema';
import AuthService from './service';
import Context from '../../types/Context';

@Resolver()
class AuthResolver {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => String)
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.authService.logIn(input, context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }
}

export default AuthResolver;
