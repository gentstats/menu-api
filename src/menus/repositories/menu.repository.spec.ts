import { Test, TestingModule } from '@nestjs/testing';
import { MenusModule } from '../menus.module';
import { MenuRepository } from './menu.repository';

describe('MenusController', () => {
  let repository: MenuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MenusModule],
      providers: [MenuRepository],
    }).compile();

    repository = module.get<MenuRepository>(MenuRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
