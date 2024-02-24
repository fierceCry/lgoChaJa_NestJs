import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class JoinRequserDto extends PickType(Users,[
  'email',
  'nickname',
  'password',
  ] as const){
}