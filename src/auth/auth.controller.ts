import {Body, Controller, Logger, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiTags} from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
