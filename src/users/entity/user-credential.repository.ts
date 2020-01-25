import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialEntity } from './user-credential.entity';

@EntityRepository(UserCredentialEntity)
export class UserCredentialRepository extends Repository<UserCredentialEntity> {}
