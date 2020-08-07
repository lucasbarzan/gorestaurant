import React from 'react';

import { render, fireEvent, act, wait } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list the food plates', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    apiMock.onGet('/categories').reply(200, [
      {
        id: 1,
        title: 'Massas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/massas.png',
      },
    ]);

    apiMock.onGet('/foods').reply(config => {
      if (config.params.name_like === '') {
        return [200, items];
      }

      return [200, items];
    });

    apiMock.onGet('/foods?name_like=').reply(200, items);

    const { getByText } = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByText('Veggie')).toBeTruthy();
    expect(
      getByText(
        'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
      ),
    ).toBeTruthy();
  });

  it('should be able to list the food plates filtered by category', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    const categoryOneItems = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
    ];

    const categoryTwoItems = [
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    const categories = [
      {
        id: 1,
        title: 'Massas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/massas.png',
      },
      {
        id: 2,
        title: 'Pizzas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/pizzas.png',
      },
    ];

    apiMock.onGet('/foods').reply(config => {
      switch (config.params.category_like) {
        case 1:
          return [200, categoryOneItems];

        case 2:
          return [200, categoryTwoItems];

        default:
          return [200, items];
      }
    });

    apiMock.onGet('/foods?category_like=1').reply(200, categoryOneItems);
    apiMock.onGet('/foods?category_like=2').reply(200, categoryTwoItems);

    apiMock.onGet('/categories').reply(200, categories);

    const { getByText, queryByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Massas')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Massas')).toBeTruthy();
    expect(getByText('Pizzas')).toBeTruthy();

    expect(getByText('Ao molho')).toBeTruthy();
    expect(getByText('Veggie')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('category-1'));
    });

    expect(getByText('Ao molho')).toBeTruthy();

    expect(queryByText('Veggie')).toBeFalsy();

    await act(async () => {
      fireEvent.press(getByTestId('category-2'));
    });

    expect(queryByText('Ao molho')).toBeFalsy();
    expect(getByText('Veggie')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('category-2'));
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(getByText('Veggie')).toBeTruthy();
  });

  it('should be able to list the food plates filtered by name search', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    const aoMolhoSearchResult = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
    ];

    const veggieSearchResult = [
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    const categories = [
      {
        id: 1,
        title: 'Massas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/massas.png',
      },
      {
        id: 2,
        title: 'Pizzas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/pizzas.png',
      },
    ];

    apiMock.onGet('/foods').reply(config => {
      switch (config.params.name_like) {
        case 'Ao molho':
          return [200, aoMolhoSearchResult];

        case 'Veggie':
          return [200, veggieSearchResult];

        default:
          return [200, items];
      }
    });

    apiMock.onGet('/foods?name_like=Ao molho').reply(200, aoMolhoSearchResult);

    apiMock.onGet('/foods?name_like=Veggie').reply(200, veggieSearchResult);

    apiMock.onGet('/categories').reply(200, categories);

    const { getByText, queryByText, getByTestId, debug } = render(
      <Dashboard />,
    );

    await wait(() => expect(getByText('Massas')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Massas')).toBeTruthy();
    expect(getByText('Pizzas')).toBeTruthy();

    expect(getByText('Ao molho')).toBeTruthy();
    expect(getByText('Veggie')).toBeTruthy();

    const inputSearch = getByTestId('search-input');

    await act(async () => {
      fireEvent.changeText(inputSearch, 'Ao molho');
    });

    expect(getByText('Ao molho')).toBeTruthy();

    expect(queryByText('Veggie')).toBeFalsy();

    await act(async () => {
      fireEvent.changeText(inputSearch, 'Veggie');
    });

    expect(queryByText('Ao molho')).toBeFalsy();

    expect(getByText('Veggie')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(inputSearch, '');
    });

    expect(getByText('Ao molho')).toBeTruthy();

    expect(queryByText('Veggie')).toBeTruthy();
  });

  it('should be able to navigate to the food details page', async () => {
    const items = [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: 19.9,
        category: 1,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/ao_molho.png',
        extras: [
          {
            id: 1,
            name: 'Bacon',
            value: 1.5,
          },
          {
            id: 2,
            name: 'Frango',
            value: 2,
          },
        ],
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '21.90',
        category: 2,
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
        thumbnail_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/veggie.png',
        extras: [
          {
            id: 3,
            name: 'Bacon',
            value: 1.5,
          },
        ],
      },
    ];

    apiMock.onGet('/categories').reply(200, [
      {
        id: 1,
        title: 'Massas',
        image_url:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-gorestaurant-mobile/massas.png',
      },
    ]);

    apiMock.onGet('/foods').reply(config => {
      if (config.params.name_like === '') {
        return [200, items];
      }

      return [200, items];
    });

    apiMock.onGet('/foods?name_like=').reply(200, items);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    await act(async () => {
      fireEvent.press(getByTestId('food-1'));
    });

    expect(getByTestId('food-1')).toBeTruthy();

    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    expect(mockedNavigate).toHaveBeenCalledWith('FoodDetails', {
      id: 1,
    });
  });
});
