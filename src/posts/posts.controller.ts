import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { UserCreateDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/post-put.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@ApiTags('POST')
@Controller('lgoChaja/posts')
export class PostsController {
  constructor(private readonly postService: PostsService){}

  @ApiOperation({
    summary : "유저 게시글 생성"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    '게시글이 생성되었습니다.'
    `
  })
  @Post()
  @UseGuards(new LoggedInGuard())
  async postCreate(
    @User() user: Users,
    @Body() post: UserCreateDto,
    @Body('postCategory') postCategory:number,
    @Body('imageUrl') postImage: string
  ){
    const result = await this.postService.postCreate(
      user.id, 
      post.postContent, 
      post.postTitle, 
      post.tags,
      postCategory,
      postImage
    )
    return { data : result}
  }

  @ApiOperation({
    summary : "전체 게시글 조회"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    '게시글이 생성되었습니다.'
    `
  })
  @Get()
  @UseGuards(new LoggedInGuard())
  async allPostGet(
  ){
    const reuslt = await this.postService.allPostGet()
    return {data: reuslt}
  }

  @ApiOperation({
    summary : "유저 게시글 수정"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    '게시글 수정 완료'
    `
  })
  @Put('/:postId')
  @UseGuards(new LoggedInGuard())
  async postPatch(
    @User() user: Users,
    @Param('postId') postId: number,
    @Body() updateData: UpdatePostDto,
  ) {
    const result = await this.postService.modifyPost(
      user.id, 
      postId, 
      updateData.postContent,
      updateData.imageUrl,
      updateData.postTitle,
      updateData.postCategory,
      updateData.tags
    );
    return { data: result };
  }

  @ApiOperation({
    summary : "유저 게시글 삭제"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    '게시글 삭제 완료'
    `
  })
  @Delete(':postId')
  @UseGuards(new LoggedInGuard())
  async postDelete(
    @User() user: Users,
    @Param('postId') postId:number
  ){
    const result = await this.postService.postDelete(user.id, postId)
    return {data:result}
  }
}
