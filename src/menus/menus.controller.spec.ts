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
  });

  afterAll(async () => {
    await connections[1].close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
