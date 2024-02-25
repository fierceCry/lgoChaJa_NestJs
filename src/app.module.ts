import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { UsersModule } from './users/users.module';
import { MorganModule, MorganInterceptor } from "nest-morgan";
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

import dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MorganModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type : "mysql",
      host : process.env.DB_HOST,
      port : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities : [
        Users
      ],
      keepConnectionAlive : true,
      synchronize : false,
      logging : true,
      migrations: [__dirname + "/migrations/*.ts"],
    })
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: MorganInterceptor("combined"),},
],
})
export class AppModule {}
