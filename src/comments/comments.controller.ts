import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Users } from 'src/entities/Users';
import { User } from 'src/common/decorators/user.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@ApiTags('COMMENTS')
@Controller('api/v1/posts')
export class CommentsController {
  constructor(
    private readonly commentsService : CommentsService
  ){}

  @ApiOperation({
    summary : "게시글 댓글 생성"
  })
  @ApiResponse({
    status: 200,
    description: 
    `
    댓글 완료
    `
  })
  @Post('/:postId/comments')
  @UseGuards(new LoggedInGuard())
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
    description: 
    `
    댓글 수정 완료
    `
  })
  @Patch('/:postId/comments/:commentsId')
  @UseGuards(new LoggedInGuard())
  async commentsPatch(
    @User() user: Users,
    @Param('postId') postId: number,
    @Param('commentsId') commentsId: number,
    @Body('comments') comments: string
  ){
    const result = await this.commentsService.commentsPatch(
      user.id,
      postId,
      commentsId,
      comments
    )
    return {data: result}
  }

  @ApiOperation({
    summary : "댓글 삭제"
  })
  @ApiResponse({
    status: 200,
    description: 
    `
    댓글 삭제 완료
    `
  })
  @Delete('/:postId/comments/:commentsId')
  @UseGuards(new LoggedInGuard())
  async commentsDelete(
    @User() user: Users,
    @Param('postId') postId: number,
    @Param('commentsId') commentsId: number
  ){
    const result = await this.commentsService.commentsDelete(
      user.id,
      postId,
      commentsId
    )
    return {data: result}
  }
}
