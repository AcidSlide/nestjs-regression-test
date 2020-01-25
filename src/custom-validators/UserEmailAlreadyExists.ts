import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, Logger } from '@nestjs/common';

@ValidatorConstraint({async: true})
@Injectable()
export class UserEmailAlreadyExists implements ValidatorConstraintInterface {
  private readonly logger = new Logger(UserEmailAlreadyExists.name);
  constructor(
  ) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'User email already exists';
  }

  async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
    return false;
  }
}
