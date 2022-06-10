import { Test, TestingModule } from '@nestjs/testing';
import { MenuEntity } from './entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { menuStub } from './stubs/menu.stub';

describe('MenusController', () => {
  let controller: MenusController;
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [MenusService],
    }).compile();

    controller = module.get<MenusController>(MenusController);
    service = module.get<MenusService>(MenusService);
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
