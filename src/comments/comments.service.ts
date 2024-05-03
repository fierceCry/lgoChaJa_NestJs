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
      user: { id: userId },
      post: { id: postId },
    });
    return "댓글 성공";
  }

  async commentsPatch(
    userId: number,
    postId: number,
    commentsId: number,
    comment: string
  ) {
    // 먼저 해당 댓글을 찾습니다.
    const foundComment = await this.postCommentsRepository.findOne({
      where: {
        id: commentsId,
        user: { id: userId },
        post: { id: postId }
      }
    });
    if (!foundComment) {
      throw new Error("댓글을 찾을 수 없거나 수정 권한이 없습니다.");
    }
    foundComment.commentContent = comment;
    await this.postCommentsRepository.save(foundComment);

    return "댓글 수정 성공";
  }
}
