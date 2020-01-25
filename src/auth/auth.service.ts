import {Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);

    // if (users && users.password === password) {
    //   // tslint:disable-next-line:no-shadowed-variable
    //   const { password, ...result } = users;
    //   return result;
    // }
    if (user) {
      // tslint:disable-next-line:no-shadowed-variable
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    return await this.usersService.loginUser(loginUserDto);
  }
}
