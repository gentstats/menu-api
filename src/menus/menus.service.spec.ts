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

    it('should return instance of Menu', () => {
      expect(service.getMenu()).toBeInstanceOf(Menu);
    });

    it('should contain a title', () => {
      const menu: Menu = service.getMenu();
      expect(menu).toMatchObject({ title: 'I am a title' });
    });
  });
});
