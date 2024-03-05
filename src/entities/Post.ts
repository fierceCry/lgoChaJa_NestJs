import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { PostsComments } from './PostsComments';
import { PostLikes } from './PostLikes';
import { PostImages } from './PostImages';
import { PostsCategorys } from './PostsCategorys';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'post' })
export class Post extends BaseEntity {

  @ApiProperty({
    example: 'id',
    description : '게시글 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description : '게사글 유저 아이디'
  })
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty({
    example: '패션 제목',
    description : '게시글 제목'
  })
  @Column({ name: 'post_title' })
  postTitle: string;

  @ApiProperty({
    example: '내용',
    description : '게시글 내용'
  })
  @Column({ name: 'post_content' })
  postContent: string;

  @ApiProperty({
    example: '#패션',
    description : '게시글 태그'
  })
  @Column({ name: 'tags', nullable: true })
  tags: string;

  @ManyToOne(() => Users, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => PostsComments, postsComment => postsComment.post, { cascade: true })
  postsComments: PostsComments[];

  @OneToMany(() => PostLikes, postLike => postLike.post, { cascade: true })
  postLikes: PostLikes[];

  @OneToMany(() => PostImages, postImage => postImage.post, { cascade: true })
  postImages: PostImages[];

  @ManyToOne(() => PostsCategorys, postsCategory => postsCategory.posts, { nullable: false })
  @JoinColumn({ name: 'post_category_id' })
  postsCategorys: PostsCategorys;

}
