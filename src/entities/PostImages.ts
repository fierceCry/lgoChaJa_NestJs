import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './Post';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'post_images' })
export class PostImages {

  @ApiProperty({
    example: 'id',
    description : '게시글 이미지 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU',
    description : '이미지 경로'
  })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Post, post => post.postImages, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: Post;

}
