import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PostsCategorys } from '../../entities/PostsCategorys';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryRepository = dataSource.getRepository(PostsCategorys);
    await categoryRepository.insert([
      { categoryName: '패션' },
      { categoryName: '음식' },
      { categoryName: '여행' },
      { categoryName: '운동' },
      { categoryName: '예술' },
      { categoryName: '연예' },
      { categoryName: 'IT' },
      { categoryName: '음악' },
      { categoryName: '독서' },
      { categoryName: '요리' },
    ]);
  }
}
