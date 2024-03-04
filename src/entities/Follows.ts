import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'Follows' })
export class Follows extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.followings)
  @JoinColumn({ name: 'login_id' })
  followingUser: Users;

  @ManyToOne(() => Users, user => user.followeds)
  @JoinColumn({ name: 'follow_id' })
  followedUser: Users;

}
