import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type : "mysql",
      host : "localhost",
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
    }),
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
