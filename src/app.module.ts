import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { CustomValidatorsModule } from './custom-validators/custom-validators.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CustomValidatorsModule,
  ],
  controllers: [
    AppController,
    AuthController,
  ],
  providers: [
    AppService,
    ConfigService,
  ],
})
export class AppModule {}
