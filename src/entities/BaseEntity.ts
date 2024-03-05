import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

  @ApiProperty({
    example: 'oooo-oo-oo',
    description : '생성 시간'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: 'oooo-oo-oo',
    description : '업데이트 시간'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
