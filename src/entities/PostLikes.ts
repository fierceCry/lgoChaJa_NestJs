import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Post } from './Post';

@Entity({ name: 'post_likes' })
export class PostLikes {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.postLikes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Post, post => post.postLikes, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: Post;

}
