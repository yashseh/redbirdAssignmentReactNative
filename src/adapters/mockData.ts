import {ICategory} from '@state/slices/products/types';

export const mockProducts = [
  {
    title: {
      name: 'Burgers',
      id: 1,
      banner:
        'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
    },
    data: [
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_e39fc45600.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 2,
          name: 'Burgers',
        },
        id: 3,
        name: 'Chicken Burger',
        price: 160,
        weight: '300g',
      },
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_Two_9eeb493439.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 4,
          name: 'Burgers',
        },
        id: 5,
        name: 'Black Burger',
        price: 190,
        weight: '330g',
      },
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_e39fc45600.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 6,
          name: 'Burgers',
        },
        id: 7,
        name: 'Chicken Burger',
        price: 160,
        weight: '300g',
      },
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_e39fc45600.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 8,
          name: 'Burgers',
        },
        id: 9,
        name: 'Chicken Burger',
        price: 160,
        weight: '300g',
      },
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_e39fc45600.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 10,
          name: 'Burgers',
        },
        id: 11,
        name: 'Chicken Burger',
        price: 160,
        weight: '300g',
      },
      {
        banner:
          'https://loved-kindness-f299118583.media.strapiapp.com/burger_e39fc45600.png',
        category: {
          banner:
            'https://loved-kindness-f299118583.media.strapiapp.com/hamburger_b2bdd00a65.png',
          id: 12,
          name: 'Burgers',
        },
        id: 12,
        name: 'Chicken Burger',
        price: 160,
        weight: '300g',
      },
    ],
  },
];

export const mockCategories: ICategory[] = [
  {
    id: 1,
    name: 'Electronics',
    banner: 'https://example.com/banners/electronics.jpg',
  },
  {id: 2, name: 'Fashion', banner: 'https://example.com/banners/fashion.jpg'},
  {
    id: 3,
    name: 'Home & Kitchen',
    banner: 'https://example.com/banners/home_kitchen.jpg',
  },
  {
    id: 4,
    name: 'Beauty & Health',
    banner: 'https://example.com/banners/beauty_health.jpg',
  },
  {id: 5, name: 'Sports', banner: 'https://example.com/banners/sports.jpg'},
  {
    id: 6,
    name: 'Toys & Games',
    banner: 'https://example.com/banners/toys_games.jpg',
  },
  {id: 7, name: 'Books', banner: 'https://example.com/banners/books.jpg'},
  {
    id: 8,
    name: 'Automotive',
    banner: 'https://example.com/banners/automotive.jpg',
  },
  {
    id: 9,
    name: 'Garden & Outdoor',
    banner: 'https://example.com/banners/garden_outdoor.jpg',
  },
  {id: 10, name: 'Music', banner: 'https://example.com/banners/music.jpg'},
];
