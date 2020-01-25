import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    required: true,
    description: 'Email address of users',
    example: 'user@email.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Password of users, must be at least AlphaNumeric',
    example: 'myp@ssw0rd',
    minLength: 6,
  })
  readonly password: string;
}
