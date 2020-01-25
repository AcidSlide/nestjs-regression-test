import { EntityRepository, FindConditions, FindManyOptions, FindOneOptions, ObjectID, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
}
