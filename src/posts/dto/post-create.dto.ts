import { PickType } from "@nestjs/swagger";
import { Post } from "src/entities/Post";

export class UserCreateDto extends PickType(Post,[
  'userId',
  'postTitle',
  'postContent',
  'tags'
  ] as const){
}