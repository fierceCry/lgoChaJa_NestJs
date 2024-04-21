import { PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class UserCreateDto extends PickType(Users,[
  'email',
  ] as const){
}