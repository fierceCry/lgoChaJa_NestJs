import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { BaseEntity } from './BaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'report' })
export class Report extends BaseEntity {

  @ApiProperty({
    example: '아이디',
    description : '신고 아이디'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '안녕하세요 OOO님을 OOO사유로 신고합니다.',
    description : '신고 내용'
  })
  @Column({ name: 'report_content', nullable: false })
  reportContent: string;

  @ApiProperty({
    example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU',
    description : '신고 이미지'
  })
  @Column({ name: 'report_image', nullable: true })
  reportImage: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'login_id', referencedColumnName: 'id' })
  loginUser: Users;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'reported_id', referencedColumnName: 'id' })
  reportedUser: Users;
}
