import { Test, TestingModule } from '@nestjs/testing';
import { Menu } from './entities/menu.entity';
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

  it('should return the menu', () => {
    expect(controller.getMenu()).toMatchObject(menuStub());
  });

  it('should return instance of Menu', () => {
    expect(controller.getMenu()).toBeInstanceOf(Menu);
  });

  it('should contain a title', () => {
    const menu: Menu = controller.getMenu();
    expect(menu).toMatchObject({ title: 'I am a title' });
  });

  it(`should call service's getMenu`, () => {
    const getMenuSpy = jest.spyOn(service, 'getMenu');
    controller.getMenu();
    expect(getMenuSpy).toHaveBeenCalled();
  });
});
