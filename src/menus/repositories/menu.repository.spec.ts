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
    let sampleMenu: MenuEntity;
    let savedMenu: Menu;

    beforeAll(async () => {
      sampleMenu = menuStub();
      savedMenu = await repository.createMenu(sampleMenu);
    });

    afterAll(async () => {
      await connections[1].dropCollection('menus');
    });

    it('should create an entry with _id and menu', async () => {
      expect(savedMenu?._id).toBeTruthy();
      expect(savedMenu?.menu).toBeTruthy();
    });

    it('menu content should match input', async () => {
      expect(savedMenu.menu[0]).toMatchObject(sampleMenu);
    });
  });

  describe('getMenuById', () => {
    let sampleMenu: MenuEntity;
    let savedMenu: Menu;
    let recMenu: MenuEntity;

    beforeAll(async () => {
      sampleMenu = menuStub();
      savedMenu = await repository.createMenu(sampleMenu);
      recMenu = await repository.getMenuById(savedMenu._id);
      sampleMenu._id = savedMenu._id;
    });

    afterAll(async () => {
      await connections[1].dropCollection('menus');
    });

    it('should return the menu', () => {
      expect(recMenu).toMatchObject(sampleMenu);
    });
  });

  describe('getMenuByIdLang', () => {
    let sampleMenu: MenuEntity;
    let savedMenu: Menu;
    let recMenu: MenuEntity;

    beforeAll(async () => {
      sampleMenu = menuStub();
      savedMenu = await repository.createMenu(sampleMenu);
      sampleMenu._id = savedMenu._id;
    });

    afterAll(async () => {
      await connections[1].dropCollection('menus');
    });

    it('should return the menu', () => {
      expect(recMenu).toMatchObject(sampleMenu);
    });

    describe(`when is called with param 'es'`, () => {
      it(`title hould be 'Soy un título'`, async () => {
        recMenu = await repository.getMenuByIdLang({
          _id: savedMenu._id,
          lang: 'es',
        });

        expect(recMenu.title).toBe('Soy un título');
      });
    });

    describe(`when is called with param 'en'`, () => {
      it(`title hould be 'I am a title'`, async () => {
        recMenu = await repository.getMenuByIdLang({
          _id: savedMenu._id,
          lang: 'en',
        });

        expect(recMenu.title).toBe('I am a title');
      });
    });

    describe(`when is called with param 'it'`, () => {
      it(`title hould be 'I am a title'`, async () => {
        recMenu = await repository.getMenuByIdLang({
          _id: savedMenu._id,
          lang: 'it',
        });

        expect(recMenu.title).toBe('I am a title');
      });
    });
  });
});
