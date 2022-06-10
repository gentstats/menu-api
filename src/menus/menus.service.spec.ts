import { Test, TestingModule } from '@nestjs/testing';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { menuStub } from './stubs/menu.stub';

describe('MenusService', () => {
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusService],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMenu', () => {
    it('should return the menu', () => {
      expect(service.getMenu()).toMatchObject(menuStub());
    });

    it('should contain index, title, description and categories', () => {
      const menu: any = service.getMenu();
      expect(menu.index).toBeTruthy();
      expect(menu.title).toBeTruthy();
      expect(menu.description).toBeTruthy();
      expect(menu.categories).toBeTruthy();
    });
  });
});
