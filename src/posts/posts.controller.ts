import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { UserCreateDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/post-put.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('POST')
@Controller('posts')
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
  @Post('/create')
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
    summary : "유저 게시글 조회"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    '게시글이 생성되었습니다.'
    `
  })
  @Get('/detail')
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
  @Put('/modify/:postId')
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
  @Delete('/post/delete/:postId')
  async postDelete(
    @User() user: Users,
    @Param('postId') postId:number
  ){
    return await this.postService.postDelete(user.id, postId)
  }
}
