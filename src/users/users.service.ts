import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserCredentialEntity } from './entity/user-credential.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async getUserByUsername(username: string, includeDeleted?: boolean): Promise<UserEntity | undefined> {
    return undefined;
  }

  async getUsers(user: UserEntity): Promise<UserEntity | undefined> {
    return undefined;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    return undefined;
  }

  private generateGuestUsername(): string {
    return undefined;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return undefined;
  }

  protected createToken(user: UserEntity, userCreds: UserCredentialEntity): string {
    return undefined;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return undefined;
  }
}
