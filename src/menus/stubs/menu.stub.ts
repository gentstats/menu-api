import { Menu } from '../entities/menu.entity';

export const menuStub = (): Menu => {
  return {
    index: 1,
    title: 'I am a title',
    description: 'Well described',
    categories: [
      {
        index: 1,
        title: 'I am a title',
        description: 'Well described',
        products: [{}],
      },
    ],
  };
};
