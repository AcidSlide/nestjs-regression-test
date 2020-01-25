import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEmailAlreadyExists } from '../../custom-validators/UserEmailAlreadyExists';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({
    required: true,
    description: 'Email address of users',
    example: 'user@email.com',
  })
  @Validate(UserEmailAlreadyExists,{ message: 'Email $value is already being used' })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Password of users, must be at least AlphaNumeric',
    example: 'myp@ssw0rd',
    minLength: 6,
  })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Last Name of User',
    example: 'Surname/LastName',
  })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'First Name of User',
    example: 'FirstName',
  })
  firstName: string;
}
