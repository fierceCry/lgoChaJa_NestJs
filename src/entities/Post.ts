import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, BaseEntity } from 'typeorm';
import { Users } from './Users';
import { PostsComments } from './PostsComments';
import { PostLikes } from './PostLikes';
import { PostImages } from './PostImages';
import { PostsCategorys } from './PostsCategorys';

@Entity({ name: 'post' })
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'post_title' })
  postTitle: string;

  @Column({ name: 'post_content' })
  postContent: string;

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
