import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connections } from 'mongoose';
import { MongoModule } from '../../mongo/mongo.module';
import { MenusModule } from '../menus.module';
import { Menu, MenuSchema } from '../schemas/menu.schema';
import { MenuRepository } from './menu.repository';

describe('MenusController', () => {
  let repository: MenuRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongoModule,
        MongooseModule.forFeature([
          {
            name: Menu.name,
            schema: MenuSchema,
          },
        ]),
      ],
      providers: [MenuRepository],
    }).compile();

    repository = module.get<MenuRepository>(MenuRepository);
  });

  afterAll(() => {
    connections.map(async (conn) => {
      await conn.close();
    });
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
