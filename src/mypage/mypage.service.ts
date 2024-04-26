import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class MypageService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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

}
