import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from '../assets/Input';
import Button from '../assets/Button';
import loginImg from '../media/loginImg.svg';
import wallet from '../media/wallet.svg'
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    isDisabled: true,
    wSize: window.screen.width,
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
    window.addEventListener("resize", () => {
      this.setState({
        wSize: window.screen.width,
      })
    });
    const { emailInput, passwordInput, isDisabled, wSize } = this.state;

    return (
      <div className='container d-flex flex-column align-items-center justify-content-center vh-100 gap-3'>
        <div className={`container d-flex flex-column align-items-center justify-content-center gap-3 shadow-lg p-5 ${wSize <= 988 ? 'w-100' : 'w-50'} rounded border-top border-secondary text-light text-center`}>
        <div className={`container d-flex ${wSize <= 988 ? 'justify-content-around' : 'justify-content-evenly'} align-items-baseline`}>
        <p className='display-3'>Trybe <span className='text-success'>Wallet</span></p>
        <img src={wallet} width={wSize <= 988 ? 30 : 50} />
        </div>
        <img src={loginImg} />
        <Input
          datatestid="email-input"
          type="email"
          value={ emailInput }
          name="emailInput"
          onChange={ this.handleChange }
          className="form-control"
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
          className="form-control"
        >
          Senha:
        </Input>
        <Button disabled={ isDisabled } onClick={ this.handleClick } className={isDisabled ? 'btn btn-outline-secondary' : 'btn btn-outline-success'}>Entrar</Button>
        </div>
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
