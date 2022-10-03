import {
  CURRENCIES_FETCH,
  LOGIN_SUBMIT,
  EXPENSES_SUBMIT,
  DELETE_SUBMIT,
  ENABLE_FORM_TO_EDIT,
  EDIT_SUBMIT,
} from './actionTypes';

function loginAction(payload) {
  return { type: LOGIN_SUBMIT, email: payload };
}

function fetchCurrenciesAction() {
  return async (dispatch) => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    const key = 'USDT';
    delete response[key];
    const currencies = Object.entries(response).map((e) => e[0]);
    dispatch({ type: CURRENCIES_FETCH, currencies });
  };
}

function fetchRatesAction(state) {
  return async (dispatch) => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    const key = 'USDT';
    delete response[key];
    const exchangeRates = response;
    const expenses = { ...state, exchangeRates };
    dispatch({ type: EXPENSES_SUBMIT, expenses });
  };
}

function submitExpenseAction(payload) {
  return { type: EXPENSES_SUBMIT, expenses: payload };
}

function deleteExpenseAction(payload) {
  return { type: DELETE_SUBMIT, expenses: payload };
}

function enableEditForm(id) {
  return { type: ENABLE_FORM_TO_EDIT, editor: true, idToEdit: id };
}

function editSubmit(payload) {
  return { type: EDIT_SUBMIT, expenses: payload };
}

export {
  loginAction,
  fetchCurrenciesAction,
  submitExpenseAction,
  fetchRatesAction,
  deleteExpenseAction,
  enableEditForm,
  editSubmit,
};
