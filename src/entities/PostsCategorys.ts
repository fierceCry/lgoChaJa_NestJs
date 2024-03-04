import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Post } from './Post';

@Entity({ name: 'posts_categorys' })
export class PostsCategorys {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'category_name' })
  categoryName: string;

  @OneToMany(() => Post, post => post.postsCategorys, { cascade: true })
  posts: Post[];

}
