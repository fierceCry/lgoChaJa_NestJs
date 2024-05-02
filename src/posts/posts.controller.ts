import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { UserCreateDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/post-put.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService){}

  @Post('/create')
  async postCreate(
    @User() user: Users,
    @Body() post: UserCreateDto,
    @Body('postCategory') postCategory:number,
    @Body('imageUrl') postImage: string
  ){
    console.log(post)
    console.log(postCategory)
    console.log(postImage)
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

  @Get('/detail')
  async allPostGet(
  ){
    const reuslt = await this.postService.allPostGet()
    return {data: reuslt}
  }

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

  @Delete('/post/delete/:postId')
  async postDelete(
    @User() user: Users,
    @Param('postId') postId:number
  ){
    return await this.postService.postDelete(user.id, postId)
  }
}
