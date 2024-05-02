// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { Report } from './entities/Report';
import { PostsComments } from './entities/PostsComments';
import { PostsCategorys } from './entities/PostsCategorys';
import { PostLikes } from './entities/PostLikes';
import { PostImages } from './entities/PostImages';
import { Post } from './entities/Post';
import { Follows } from './entities/Follows';
import { BaseEntity } from './entities/BaseEntity';
import { UsersModule } from './users/users.module';
import { MorganModule, MorganInterceptor } from "nest-morgan";
import { APP_INTERCEPTOR } from '@nestjs/core';
import dotenv from "dotenv";
import { MailModule } from './mail/mail.module';
import { MypageModule } from './mypage/mypage.module';
import { AuthModule } from './auth/auth.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

dotenv.config();
@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type : "mysql",
      host : process.env.DB_HOST,
      port : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities : [
        Users,
        Report,
        PostsComments, 
        PostsCategorys, 
        PostLikes,
        PostImages,
        Post,
        Follows,
        BaseEntity
      ],
      keepConnectionAlive : true,
      synchronize : false,
      logging : true,
      retryDelay: 1000,
      migrations: [__dirname + "/migrations/*.ts"],
    }),
    UsersModule,
    AuthModule,
    MailModule,
    MypageModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: MorganInterceptor("combined"),}
],
})
export class AppModule {}
