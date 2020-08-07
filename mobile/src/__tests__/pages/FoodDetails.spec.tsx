import React from 'react';

import '@testing-library/jest-native';
import { render, wait, act, fireEvent } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import FoodDetails from '../../pages/FoodDetails';

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((value: number) => {
    switch (value) {
      case 19.9:
        return 'R$ 19,90';
      case 39.8:
        return 'R$ 39,80';
      case 22.9:
        return 'R$ 22,90';
      case 21.4:
        return 'R$ 21,40';

      default:
        return '';
    }
  }),
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: jest.fn(),
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {
        id: 1,
      },
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('Orders', () => {
  it('should be able to list the food', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 19,90');
  });

  it('should be able to increment food quantity', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 39,80');
  });

  it('should be able to decrement food quantity', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('3');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 19,90');
  });

  it('should not be able to decrement food quantity below than 1', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-food'));
    });

    expect(getByTestId('food-quantity')).toHaveTextContent('1');
  });

  it('should be able to increment an extra item quantity', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();
    expect(getByText('Frango')).toBeTruthy();

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('0');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('2');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 22,90');
  });

  it('should be able to decrement an extra item quantity', async () => {
     const favorites = [
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
      },
    ];

    apiMock.onGet('/favorites').reply(200, favorites);
    
    const item = {
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
      ],
    };

    apiMock.onGet('/foods/1').reply(200, item);

    const { getByText, getByTestId } = render(<FoodDetails />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();

    expect(getByText('Bacon')).toBeTruthy();

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('0');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    await act(async () => {
      fireEvent.press(getByTestId('increment-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('2');

    await act(async () => {
      fireEvent.press(getByTestId('decrement-extra-1'));
    });

    expect(getByTestId('extra-quantity-1')).toHaveTextContent('1');

    expect(getByTestId('cart-total')).toHaveTextContent('R$ 21,40');
  });
});
