import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connections } from 'mongoose';
import { MongoModule } from '../mongo/mongo.module';
import { MenuEntity } from './entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuRepository } from './repositories/menu.repository';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { menuStub } from './stubs/menu.stub';

describe('MenusController', () => {
  let controller: MenusController;
  let service: MenusService;
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
      controllers: [MenusController],
      providers: [MenusService, MenuRepository],
    }).compile();

    controller = module.get<MenusController>(MenusController);
    service = module.get<MenusService>(MenusService);
    repository = module.get<MenuRepository>(MenuRepository);
  });

  afterAll(async () => {
    await connections[1].close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMenuById', () => {
    let sampleMenu: MenuEntity;
    let savedMenu: Menu;
    let recMenu: MenuEntity;

    beforeAll(async () => {
      sampleMenu = menuStub();
      savedMenu = await repository.createMenu(sampleMenu);
      sampleMenu._id = savedMenu._id;
      recMenu = await controller.getMenuById(savedMenu._id.toHexString());
    });
    it(`should call service`, () => {
      const getMenuByIdSpy = jest.spyOn(service, 'getMenuById');
      controller.getMenuById(savedMenu._id.toHexString());
      expect(getMenuByIdSpy).toHaveBeenCalled();
    });

    it(`should return the service's output`, () => {
      expect(recMenu).toMatchObject(sampleMenu);
    });
  });

  describe('getMenu', () => {
    it(`should call service`, () => {
      const getMenuSpy = jest.spyOn(service, 'getMenu');
      controller.getMenu();
      expect(getMenuSpy).toHaveBeenCalled();
    });

    it(`should return the service's output`, () => {
      const serviceOutput = service.getMenu();
      expect(controller.getMenu()).toMatchObject(serviceOutput);
    });
  });
});
