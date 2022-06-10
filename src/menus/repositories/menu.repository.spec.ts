import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connections } from 'mongoose';
import { MongoModule } from '../../mongo/mongo.module';
import { MenuEntity } from '../entities/menu.entity';
import { Menu, MenuSchema } from '../schemas/menu.schema';
import { menuStub } from '../stubs/menu.stub';
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

  describe('createMenu', () => {
    const sampleMenu = menuStub();
    const savedMenu = repository.createMenu(sampleMenu);
    it('should create an entry with _id and menu', async () => {
      expect(savedMenu?._id).toBeTruthy();
      expect(savedMenu?.menu).toBeTruthy();
    });

    it('menu content should match input', async () => {
      expect(savedMenu.menu).toMatchObject(sampleMenu);
    });
  });
});
