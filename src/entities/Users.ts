import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PostLikes } from "./PostLikes";
import { PostsComments } from "./PostsComments";
import { Follows } from './Follows';
import { Report } from './Report';
import { BaseEntity } from "./BaseEntity";

Index("email", ["email"], { unique: true })
@Entity({ schema: "lgoChaja", name: "users" })
export class Users extends BaseEntity{

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
  @Column("varchar", { name: "password", length: 100, nullable: true})
  password: string;

  @ApiProperty({
    example: '일반',
    description : '소셜명'
  })
  @Column("varchar", {name : "social", length: 100, select: false })
  social: string;

  @ApiProperty({
    example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU',
    description : '이미지'
  })
  @Column("varchar", {name : "image", length: 255, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU"})
  image: string;

  @ApiProperty({
    example: '안녕하세요 OOO입니다.',
    description : '유저 소개글'
  })
  @Column("varchar", {name : "explain", length: 255, nullable: true})
  explain: string;

  @ApiProperty({
    example: 'N',
    description : '프로필 공개 여부'
  })
  @Column("char", {name : "seceret", select: true, default: "N" })
  seceret: string;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Report, (report) => report.loginUser, { cascade: true })
  loginReports: Report[];

  @OneToMany(() => Report, (report) => report.reportedUser, { cascade: true })
  reportedReports: Report[];

  @OneToMany(() => PostsComments, (comment) => comment.user, { cascade: true })
  postsComments: PostsComments[];

  @OneToMany(() => PostLikes, (like) => like.user, { cascade: true })
  postLikes: PostLikes[];

  @OneToMany(() => Follows, (follow) => follow.followingUser, { cascade: true })
  followings: Follows[];

  @OneToMany(() => Follows, (follow) => follow.followedUser, { cascade: true })
  followeds: Follows[];
  posts: any;
}