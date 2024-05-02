import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsComments } from 'src/entities/PostsComments';

@Module({
  imports: [TypeOrmModule.forFeature([PostsComments])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
