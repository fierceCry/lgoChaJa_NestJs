import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Post } from './Post';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts_categorys' })
export class PostsCategorys {

  @ApiProperty({
    example: 'id',
    description : '게시글 카테고리 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description : '게시글 아이디'
  })
  @Column({ name: 'post_id' })
  postId: number;

  @ApiProperty({
    example: '패션',
    description : '카테고리 이름'
  })
  @Column({ name: 'category_name' })
  categoryName: string;

  @OneToMany(() => Post, post => post.postsCategorys, { cascade: true })
  posts: Post[];

}
