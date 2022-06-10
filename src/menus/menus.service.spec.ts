import { Test, TestingModule } from '@nestjs/testing';
import { MenuEntity } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { menuStub } from './stubs/menu.stub';

describe('MenusService', () => {
  let service: MenusService;
  let menu: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusService],
    }).compile();

    service = module.get<MenusService>(MenusService);
    menu = service.getMenu();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMenu', () => {
    it('should return the menu', () => {
      expect(menu).toMatchObject(menuStub());
    });

    describe('menu', () => {
      it('should contain index, title, description and categories', () => {
        expect(menu.index).toBeTruthy();
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
