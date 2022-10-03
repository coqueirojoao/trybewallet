import {
  CURRENCIES_FETCH,
  DELETE_SUBMIT,
  EDIT_SUBMIT,
  ENABLE_FORM_TO_EDIT,
  EXPENSES_SUBMIT,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_FETCH:
    return {
      ...state,
      currencies: action.currencies,
    };
  case DELETE_SUBMIT:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter(({ id }) => id !== action.expenses),
      ],
    };
  case EXPENSES_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case ENABLE_FORM_TO_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    };
  case EDIT_SUBMIT:
    return {
      ...state,
      expenses: [...action.expenses],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
}
