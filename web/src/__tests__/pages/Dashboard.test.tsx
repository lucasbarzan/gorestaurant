import React from 'react';

import { render, fireEvent, act, wait } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list all the food plates from your api', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        image:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png',
      },
      {
        id: 2,
        name: 'Veggie',
        description:
          'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        price: '19.90',
        available: true,
        image:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
      },
      {
        id: 3,
        name: 'A la Camarón',
        description:
          'Macarrão com vegetais de primeira linha e camarão dos 7 mares.',
        price: '19.90',
        available: true,
        image:
          'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food3.png',
      },
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    expect(getByText('Veggie')).toBeTruthy();
    expect(
      getByText(
        'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-2')).toBeTruthy();
    expect(getByTestId('edit-food-3')).toBeTruthy();

    expect(getByText('A la Camarón')).toBeTruthy();
    expect(
      getByText(
        'Macarrão com vegetais de primeira linha e camarão dos 7 mares.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-3')).toBeTruthy();
    expect(getByTestId('edit-food-3')).toBeTruthy();
  });

  it('should be able to add a new food plate', async () => {
    apiMock.onGet('foods').reply(200, []);

    const { getByText, getByTestId, getByPlaceholderText, debug } = render(
      <Dashboard />,
    );

    act(() => {
      fireEvent.click(getByText('Novo Prato'));
    });

    const inputImage = getByPlaceholderText('Cole o link aqui');
    const inputName = getByPlaceholderText('Ex: Moda Italiana');
    const inputValue = getByPlaceholderText('Ex: 19.90');
    const inputDescription = getByPlaceholderText('Descrição');

    await act(async () => {
      fireEvent.change(inputImage, {
        target: { value: 'http://rocketseat.com.br' },
      });
      fireEvent.change(inputName, { target: { value: 'Ao molho' } });
      fireEvent.change(inputValue, { target: { value: '19.90' } });
      fireEvent.change(inputDescription, {
        target: {
          value:
            'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        },
      });
    });

    expect(inputImage.value).toBe('http://rocketseat.com.br');
    expect(inputName.value).toBe('Ao molho');
    expect(inputValue.value).toBe('19.90');
    expect(inputDescription.value).toBe(
      'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
    );

    apiMock.onPost('foods').reply(200, {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: '19.90',
      available: true,
      image: 'http://rocketseat.com.br',
    });

    await act(async () => {
      fireEvent.click(getByTestId('add-food-button'));
    });

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });

  it('should be able to edit a food plate', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        image: 'http://rocketseat.com.br',
      },
    ]);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />,
    );

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    act(() => {
      fireEvent.click(getByTestId('edit-food-1'));
    });

    const inputImage = getByPlaceholderText('Cole o link aqui');
    const inputName = getByPlaceholderText('Ex: Moda Italiana');
    const inputValue = getByPlaceholderText('Ex: 19.90');
    const inputDescription = getByPlaceholderText('Descrição');

    await act(async () => {
      fireEvent.change(inputImage, {
        target: { value: 'http://rocketseat.com.br' },
      });
      fireEvent.change(inputName, { target: { value: 'Veggie' } });
      fireEvent.change(inputValue, { target: { value: '21.90' } });
      fireEvent.change(inputDescription, {
        target: {
          value:
            'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
        },
      });
    });

    expect(inputImage.value).toBe('http://rocketseat.com.br');
    expect(inputName.value).toBe('Veggie');
    expect(inputValue.value).toBe('21.90');
    expect(inputDescription.value).toBe(
      'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
    );

    apiMock.onPut('foods/1').reply(200, {
      id: 1,
      name: 'Veggie',
      description:
        'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
      price: '21.90',
      available: true,
      image: 'http://rocketseat.com.br',
    });

    await act(async () => {
      fireEvent.click(getByTestId('edit-food-button'));
    });

    await wait(() => expect(getByText('Veggie')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Veggie')).toBeTruthy();
    expect(
      getByText(
        'Macarrão com pimentão, ervilha e ervas finas colhidas no himalaia.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });

  it('should be able to remove a food plate', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        image: 'http://rocketseat.com.br',
      },
    ]);

    apiMock.onDelete('foods/1').reply(204);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('remove-food-1'));
    });

    expect(getByTestId('foods-list')).toBeEmpty();
  });

  it('should be able to update the availibility of a food plate', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        name: 'Ao molho',
        description:
          'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
        price: '19.90',
        available: true,
        image: 'http://rocketseat.com.br',
      },
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByText('Disponível')).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    apiMock.onPut('foods/1').reply(200, {
      id: 1,
      name: 'Ao molho',
      description:
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      price: '19.90',
      available: false,
      image: 'http://rocketseat.com.br',
    });

    await act(async () => {
      fireEvent.click(getByTestId('change-status-food-1'));
    });

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByText('Indisponível')).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('change-status-food-1'));
    });

    await wait(() => expect(getByText('Ao molho')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Ao molho')).toBeTruthy();
    expect(
      getByText(
        'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
      ),
    ).toBeTruthy();
    expect(getByText('Disponível')).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });
});
