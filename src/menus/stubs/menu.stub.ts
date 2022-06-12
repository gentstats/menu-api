import { MenuEntity } from '../entities/menu.entity';

export const menuStub = (): MenuEntity => {
  return {
    lang: 'en',
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

export const multipleMenuStub = (): MenuEntity[] => {
  return [
    {
      lang: 'es',
      title: 'Soy un título',
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
    },
    {
      lang: 'en',
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
    },
  ];
};
