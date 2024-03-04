import { DataSource } from "typeorm";
import { Users } from "./src/entities/Users";
import { PostsComments } from "./src/entities/PostsComments";
import { PostsCategorys } from "./src/entities/PostsCategorys";
import { PostLikes } from "./src/entities/PostLikes";
import { PostImages } from "./src/entities/PostImages";
import { Post } from "./src/entities/Post";
import { Follows } from "./src/entities/Follows";
import { BaseEntity } from "./src/entities/BaseEntity";
import { Report } from "./src/entities/Report";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host : process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
    entities: [
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
  migrations: [__dirname + "/src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});
export default dataSource;
