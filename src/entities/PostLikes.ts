import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Post } from './Post';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'post_likes' })
export class PostLikes {

  @ApiProperty({
    example: 'id',
    description : '게시글 좋아요 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.postLikes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Post, post => post.postLikes, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: Post;

}
