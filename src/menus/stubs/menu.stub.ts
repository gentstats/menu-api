import { MenuEntity } from '../entities/menu.entity';

export const menuStub = (): MenuEntity => {
  return {
    index: 1,
    title: 'I am a title',
    description: 'Well described',
    categories: [
      {
        index: 1,
        title: 'I am a title',
        description: 'Well described',
        products: [
          {
            index: 1,
            title: 'I am a title',
            description: 'Well described',
            price: 3.5,
          },
        ],
      },
    ],
  };
};
