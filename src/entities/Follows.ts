import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { BaseEntity } from './BaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Follows' })
export class Follows extends BaseEntity {

  @ApiProperty({
    example: 'id',
    description : '팔로우 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.followings)
  @JoinColumn({ name: 'follower_id' })
  followingUser: Users;

  @ManyToOne(() => Users, user => user.followeds)
  @JoinColumn({ name: 'followed_id' })
  followedUser: Users;
}
