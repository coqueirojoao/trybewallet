import { LOGIN_SUBMIT } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return { email: action.email };
  default:
    return state;
  }
}
