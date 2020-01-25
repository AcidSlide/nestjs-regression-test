import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './entity/user.entity';
import {CurrentUser} from './entity/user.decorator';
import {CurrentUserInterface} from './dto/current-user.interface';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getUsers(@CurrentUser() currentUser: CurrentUserInterface): Promise<UserEntity | undefined> {
    // return await this.userService.getUsers(currentUser.user);
    return undefined;
  }
}
