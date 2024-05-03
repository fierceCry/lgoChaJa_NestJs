import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Users } from 'src/entities/Users';
import { User } from 'src/common/decorators/user.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('COMMENTS')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService : CommentsService
  ){}

  @ApiOperation({
    summary : "게시글 댓글 생성"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    댓글 완료
    `
  })
  @Post('/post/:postId')
  async commentsCreate(
    @User() user: Users,
    @Param('postId') postId : number,
    @Body('comments') comments:string
  ){
    const result = await this.commentsService.commentsCreate(
      user.id, 
      postId,
      comments
    );
    return {data: result};
  }
  
  @ApiOperation({
    summary : "댓글 수정"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    댓글 수정 완료
    `
  })
  @Patch('post/:postId/:commentsId')
  async commentsPatch(
    @User() user:Users,
    @Param('postId') postId:number,
    @Param('commentsId') commentsId:number,
    @Body('comments') commets:string
  ){
    const result = await this.commentsService.commentsPatch(
      user.id,
      postId,
      commentsId,
      commets
    )
    return {data: result}
  }

  @ApiOperation({
    summary : "댓글 삭제"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    댓글 삭제 완료
    `
  })
  @Delete('post/:postId/comments/:commentsId')
  async commentsDelete(
    @User() user:Users,
    @Param('postId') postId:number,
    @Param('commentsId') commentsId:number
  ){
    const result = await this.commentsService.commentsDelete(
      user.id,
      postId,
      commentsId
    )
    return {data: result}
  }
}
