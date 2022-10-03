import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from '../assets/Input';
import Button from '../assets/Button';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    isDisabled: true,
  };

  validateInputs = () => {
    const { emailInput, passwordInput } = this.state;
    const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const MIN_LENGTH = 6;
    if (emailRegEx.test(emailInput) && passwordInput.length >= MIN_LENGTH) {
      return this.setState({
        isDisabled: false,
      });
    }
    return this.setState({
      isDisabled: true,
    });
  };

  handleClick = () => {
    const { userDispatch, history } = this.props;
    const { emailInput } = this.state;
    userDispatch(emailInput);
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  };

  render() {
    const { emailInput, passwordInput, isDisabled } = this.state;
    return (
      <div>
        <Input
          datatestid="email-input"
          type="email"
          value={ emailInput }
          name="emailInput"
          onChange={ this.handleChange }
        >
          Email:
        </Input>
        <Input
          datatestid="password-input"
          type="password"
          minLength="6"
          name="passwordInput"
          value={ passwordInput }
          onChange={ this.handleChange }
        >
          Senha:
        </Input>
        <Button disabled={ isDisabled } onClick={ this.handleClick }>Entrar</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(loginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
