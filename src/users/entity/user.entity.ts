import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {ApiHideProperty} from '@nestjs/swagger';

@Entity('users', { synchronize: false })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    unique: true,
    length: 128,
    nullable: false,
  })
  username: string;

  @Column({
    unique: true,
    length: 190,
    nullable: false,
  })
  email: string;

  @ApiHideProperty()
  @Column({
    name: 'email_validation_code',
    nullable: true,
    default: null,
  })
  emailValidationCode?: string;

  @Column({
    nullable: true,
    default: null,
    name: 'email_verified_at',
  })
  emailVerifiedAt?: Date;

  @Column({
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    nullable: true,
    default: null,
    name: 'first_name',
  })
  firstName?: string;

  @Column({
    nullable: true,
    default: null,
    name: 'middle_name',
  })
  middleName?: string;

  @Column({
    name: 'default_branch',
    type: 'bigint',
    unsigned: true,
  })
  defaultBranchId: number;

  @Column({
    name: 'last_login',
    default: null,
    nullable: true,
  })
  lastLogin?: Date;

  // @OneToMany(type => AddressEntity, address => address.user)
  // addresses: AddressEntity[];
  isVerified(): boolean {
    return this.emailVerifiedAt !== null;
  }
}
