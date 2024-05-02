import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Post } from './Post';
import { BaseEntity } from './BaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts_comments' })
export class PostsComments extends BaseEntity {

  @ApiProperty({
    example: 'id',
    description : '게시글 댓글 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '좋은글 감사합니다',
    description : '댓글 내용'
  })
  @Column({ name: 'comment_content', nullable: false })
  commentContent: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  @OneToMany(() => PostsComments, comment => comment.parentComment, { cascade: true, nullable: true })
  @JoinColumn({ name: 'parent_comment_id' })
  childComments: PostsComments[];

  @ManyToOne(() => PostsComments, comment => comment.childComments, { nullable: true })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  parentComment: PostsComments;
}
