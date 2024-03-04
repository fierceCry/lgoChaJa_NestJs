import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Post } from './Post';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'posts_comments' })
export class PostsComments extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'comment_content', nullable: false })
  commentContent: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;
}
