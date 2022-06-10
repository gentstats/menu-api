import { Menu } from '../entities/menu.entity';

export const menuStub = () => {
  const menu = new Menu();
  menu.title = 'I am a title';
  return menu;
};
