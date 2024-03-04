import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'report' })
export class Report extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'report_content', nullable: false })
  reportContent: string;

  @Column({ name: 'report_image', nullable: true })
  reportImage: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'login_id', referencedColumnName: 'id' })
  loginUser: Users;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'reported_id', referencedColumnName: 'id' })
  reportedUser: Users;
}
