import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PostLikes } from "./PostLikes";
import { PostsComments } from "./PostsComments";
import { Follows } from './Follows';
import { Report } from './Report';

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

  @Column("varchar", {name : "social", length: 100, select: false })
  social: string;

  @Column("varchar", {name : "image", length: 255, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU"})
  image: string;

  @Column("varchar", {name : "explain", length: 255, nullable: true})
  explain: string;

  @Column("char", {name : "seceret", select: true, default: "N" })
  seceret: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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