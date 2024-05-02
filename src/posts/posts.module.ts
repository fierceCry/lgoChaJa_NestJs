import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/Post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostImages } from 'src/entities/PostImages';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostImages])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
