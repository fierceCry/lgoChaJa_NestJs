import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

Index("email", ["email"], { unique: true })
@Entity({ schema: "lgoChaja", name: "users" })
export class Users {

  @ApiProperty({
    example: 1,
    description : 'id'
  })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'vlsual0917@gmail.com',
    description : '이메일'
  })
  @Column("varchar", { name: "email", unique: true, length: 30 })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'kimmangyu',
    description : '닉네임'
  })
  @Column("varchar", { name: "nickname", length: 30 })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    description : '비밀번호'
  })
  @Column("varchar", { name: "password", length: 100, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}