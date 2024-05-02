import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post';
import { PostImages } from 'src/entities/PostImages';
import { Repository } from 'typeorm';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Post)
    private postImageRepository: Repository<PostImages>,
  ) {}

  async postCreate(
    userId: number,
    postContent: string,
    postTitle: string,
    tags: string,
    postCategory: number,
    postImage: string,
  ) {
    await this.postRepository.query(
      `INSERT INTO post (
        user_id, 
        post_title, 
        post_content, 
        tags, 
        post_category_id
      ) VALUES (?, ?, ?, ?, ?)`,
      [userId, postTitle, postContent, tags, postCategory],
    );
    await this.postRepository.query(
      `INSERT INTO post_images (
        post_id, 
        image_url
      ) VALUES (LAST_INSERT_ID(), ?)`,
      [postImage],
    );
    return '게시글이 생성되었습니다.';
  }

  async allPostGet() {
    try {
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.postImages', 'image')
        .leftJoinAndSelect('post.postsCategorys', 'category')
        .getMany();
      return posts;
    } catch {
      throw new NotFoundException('조회할수없습니다.');
    }
  }

  async modifyPost(
    userId: number,
    postId: number,
    postContent: string,
    postImages: string,
    postTitle: string,
    postsCategorys: number,
    tags: string,
  ) {
    await this.postRepository.query(
      `UPDATE post
    SET
    post_content = ?,
    post_title = ?,
    post_category_id = ?,
    tags = ?
    WHERE
      id = ?
      AND user_id = ?
    `,
      [postContent, postTitle, postsCategorys, tags, postId, userId],
    );

    await this.postImageRepository.query(
      `
      UPDATE post_images
      SET
      image_url = ?
      WHERE
        post_id = ? 
      `,
      [postImages, postId]
    )
    return "게시글 수정완료"
  }
}
