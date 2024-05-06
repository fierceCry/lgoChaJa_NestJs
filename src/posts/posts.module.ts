import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/Post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostImages } from 'src/entities/PostImages';
import { Users } from 'src/entities/Users';
import { PostsComments } from 'src/entities/PostsComments';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostImages, Users, PostsComments])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
