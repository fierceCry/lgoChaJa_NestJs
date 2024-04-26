import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcrypt";

@Injectable()
export class MypageService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly userService: UsersService
  ) {}

  async findFollowedUsers(userId: number) {
    return this.usersRepository.query(
      `
      SELECT 
      u.email,
      u.nickname,
      u.image,
      (SELECT COUNT(DISTINCT f.follower_id) 
      FROM follows f 
      WHERE f.followed_id = u.id) AS follower_count,
      (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', p.id,
              'tags', p.tags,
              'post_title', p.post_title,
              'post_content', p.post_content,
              'category_name', 
              (SELECT pc.category_name 
                FROM posts_categorys pc
                WHERE pc.id = p.post_category_id)
          )
      ) FROM post p WHERE p.user_id = u.id) AS posts
      FROM users u
      WHERE u.id = ?
      GROUP BY u.id; 
    `,
      [userId],
    );
  }

  // findFollowedUsers 쿼리빌덕로 수정한것
  async findFollowedUserss(userId: number) {
    return this.usersRepository
    .createQueryBuilder('u')
    .select([
      'u.email', 
      'u.nickname',
      'u.image',
    ])
    .addSelect(subQuery => {
      return subQuery
        .select('SUM(f.follower_id)', 'followersIdSum')
        .from('Follows', 'f')
        .where('f.followed_id = u.id');
    }, 'followersIdSum')
    .leftJoin('u.posts', 'p')
    .addSelect([
      'p.post_title', 
      'p.post_content', 
      'p.tags'
    ])
    .leftJoin('p.category', 'pc')
    .addSelect('pc.category_name')
    .where('u.id = :userId', { userId })
    .groupBy('u.email')
    .addGroupBy('u.nickname')
    .addGroupBy('u.image')
    .addGroupBy('p.id')
    .getRawMany();
  
  }

  async password(userId:number, password:string, newPassword:string){
    const result = await this.userService.getUser(userId)
    if(!result){
      throw new ForbiddenException('없는 사용자 입니다.');
    }
    const hashedPassword = await bcrypt.compare(password, result.password);
    if(!hashedPassword){
      throw new ForbiddenException('기존 패스워드가 틀립니다.');
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, parseInt(process.env.HASHSALT));

    await this.usersRepository
    .update({ id: userId }, { password: hashedNewPassword });

    return { data: "패스워드 변경되었습니다."};
  }
}
