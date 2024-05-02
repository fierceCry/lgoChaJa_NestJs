import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsComments } from 'src/entities/PostsComments';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostsComments)
    private postCommentsRepository: Repository<PostsComments>,
  ){}

  async commentsCreate(userId: number, postId: number, comment: string) {
    const result = await this.postCommentsRepository.save({
      commentContent: comment,
      user: { id: userId }, // `user`는 `Users` 엔티티에 대한 참조입니다.
      post: { id: postId }, // `post`는 `Post` 엔티티에 대한 참조입니다.
    });
    return "댓글 성공";
  }
}
