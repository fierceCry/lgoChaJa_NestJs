import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './Post';

@Entity({ name: 'post_images' })
export class PostImages {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Post, post => post.postImages, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: Post;

}
