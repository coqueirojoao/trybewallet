import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const initialState = {
  user: {
    email: 'joao@gmail.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [{
      id: 0,
      value: '12',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '12',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('Verifica página de login', () => {
  it('Verifica se existem os componentes na página de login', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });
  it('Verifica se ao digitar os valores corretos nos campos, é possível logar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'joao@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(btnLogin);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Verifica página de carteira', () => {
  it('Verifica se existem os componentes na página de carteira', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const totalField = screen.getByTestId('total-field');
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(inputValue).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
  });
});

describe('Verifica as renderizações', () => {
  it('Verifica no componente Table se são renderizadas as informações', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const inputValue = screen.getByTestId('value-input');
    const valueContent = screen.getByRole('cell', { name: /12\.00/i });
    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    const editBtn = screen.getByRole('button', { name: /editar/i });
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueContent).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);
    const editConfirm = screen.getByRole('button', { name: /editar despesa/i });
    expect(editConfirm).toBeInTheDocument();

    userEvent.type(inputValue, '15');
    userEvent.click(editConfirm);
    const editedValueContent = screen.getByRole('cell', { name: /15\.00/i });
    expect(editedValueContent).toBeInTheDocument();

    userEvent.click(deleteBtn);
    expect(editedValueContent).not.toBeInTheDocument();
    expect(valueContent).not.toBeInTheDocument();

    userEvent.type(inputValue, '15');
    userEvent.click(addButton);
    const newValueContent = await screen.findByText(/15\.00/i);
    expect(newValueContent).toBeInTheDocument();
  });
});
