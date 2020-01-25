import { Module } from '@nestjs/common';
import { UserEmailAlreadyExists } from './UserEmailAlreadyExists';

@Module({
  imports: [],
  providers: [UserEmailAlreadyExists],
})
export class CustomValidatorsModule {}
