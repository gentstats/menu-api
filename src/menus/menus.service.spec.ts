import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connections } from 'mongoose';
import { MongoModule } from '../mongo/mongo.module';
import { MenuEntity } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { MenuRepository } from './repositories/menu.repository';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { menuStub, multipleMenuStub } from './stubs/menu.stub';

describe('MenusService', () => {
  let service: MenusService;
  let menu: any;
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
      providers: [MenusService, MenuRepository],
    }).compile();

    service = module.get<MenusService>(MenusService);
    repository = module.get<MenuRepository>(MenuRepository);
    menu = service.getMenu();
  });

  afterAll(async () => {
    await connections[1].dropCollection('menus');
    await connections[1].close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMenuByIdLang', () => {
    let sampleMenus: MenuEntity[];
    let savedMenus: Menu;
    let recMenu: MenuEntity;

    beforeEach(async () => {
      sampleMenus = multipleMenuStub();
      savedMenus = await repository.createMenus(sampleMenus);
      recMenu = await repository.getMenuByIdLang({
        _id: savedMenus._id,
        lang: 'es',
      });
    });

    it('should call repository', async () => {
      const mockRepository = jest.spyOn(repository, 'getMenuByIdLang');
      await service.getMenuByIdLang({
        _id: savedMenus._id.toHexString(),
        lang: 'es',
      });
      expect(mockRepository).toHaveBeenCalled();
    });

    it('output should match repository output', async () => {
      expect(
        await service.getMenuByIdLang({
          _id: savedMenus._id.toHexString(),
          lang: 'es',
        }),
      ).toMatchObject(recMenu);
    });
  });

  describe('getMenuById', () => {
    let sampleMenu: MenuEntity;
    let savedMenu: Menu;
    let recMenu: MenuEntity;

    beforeEach(async () => {
      sampleMenu = menuStub();
      savedMenu = await repository.createMenu(sampleMenu);
      recMenu = await service.getMenuById(savedMenu._id.toHexString());
      sampleMenu._id = savedMenu._id;
    });

    it('should call repository', async () => {
      const mockRepository = jest.spyOn(repository, 'getMenuById');
      await service.getMenuById(savedMenu._id.toHexString());
      expect(mockRepository).toHaveBeenCalled();
    });

    it('should return the menu', () => {
      expect(recMenu).toMatchObject(sampleMenu);
    });
  });

  describe('getMenu', () => {
    it('should return the menu', () => {
      expect(menu).toMatchObject(menuStub());
    });

    describe('menu', () => {
      it('should contain index, title, description and categories', () => {
        expect(menu.lang).toBeTruthy();
        expect(menu.title).toBeTruthy();
        expect(menu.description).toBeTruthy();
        expect(menu.categories).toBeTruthy();
      });

      describe('categories', () => {
        it('should contain index, title, description and products', () => {
          expect(menu.categories[0].index).toBeTruthy();
          expect(menu.categories[0].title).toBeTruthy();
          expect(menu.categories[0].description).toBeTruthy();
          expect(menu.categories[0].products).toBeTruthy();
        });

        describe('menu', () => {
          it('should contain index, title, description and price', () => {
            expect(menu.categories[0].products[0].index).toBeTruthy();
            expect(menu.categories[0].products[0].title).toBeTruthy();
            expect(menu.categories[0].products[0].description).toBeTruthy();
            expect(menu.categories[0].products[0].price).toBeTruthy();
          });
        });
      });
    });
  });
});
