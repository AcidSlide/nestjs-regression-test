import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn, SaveOptions } from 'typeorm';
import { UserEntity } from './user.entity';
import { Logger } from '@nestjs/common';
import * as uuid from 'uuid/v4';

@Entity('user_credentials', { synchronize: false })
export class UserCredentialEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    name: 'user_token',
    unique: true,
  })
  userToken: string;

  @Column({
    name: 'auth_provider',
    nullable: false,
    default: 'jwt',
  })
  authProvider?: string;
}
