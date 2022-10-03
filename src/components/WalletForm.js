import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../assets/Input';
import Button from '../assets/Button';
import { editSubmit, fetchRatesAction } from '../redux/actions';

const tagState = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: tagState,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = () => {
    const { ratesDispatch } = this.props;
    const [currency, method, tag] = ['USD', 'Dinheiro', tagState];
    ratesDispatch(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency,
      method,
      tag,
    }));
  };

  editExpense = () => {
    const { idToEdit, editDispatch, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editExpenses = expenses;
    const indexOfId = editExpenses.findIndex((e) => e.id === idToEdit);
    editExpenses[indexOfId].value = value;
    editExpenses[indexOfId].description = description;
    editExpenses[indexOfId].currency = currency;
    editExpenses[indexOfId].method = method;
    editExpenses[indexOfId].tag = tag;
    editDispatch(editExpenses);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagState,
    });
  };

  render() {
    const { option, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className='container mt-2 text-light text-center'>
        <div className='container d-flex justify-content-center gap-5 flex-wrap'>
        <Input
          datatestid="value-input"
          value={ value }
          name="value"
          onChange={ this.handleChange }
          className="form-control"
        >
          Valor:
        </Input>
        <Input
          datatestid="description-input"
          value={ description }
          name="description"
          onChange={ this.handleChange }
          className="form-control"
        >
          Descrição:
        </Input>
        <label htmlFor="selectCoin">
          Moeda:
          <select
            id="selectCoin"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            className='form-select'
          >
            {option.map((e) => (
              <option key={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            id="paymentMethod"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
            className='form-select'
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagSelect">
          Tag:
          <select
            id="tagSelect"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            className='form-select'
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {editor ? (
          <Button onClick={ this.editExpense }>Editar despesa</Button>
        ) : (
          <Button onClick={ this.addExpense } className="btn btn-warning w-50">Adicionar despesa</Button>
        )}
      </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  editDispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape([]).isRequired,
  idToEdit: PropTypes.number.isRequired,
  option: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  ratesDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  option: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  ratesDispatch: (state) => dispatch(fetchRatesAction(state)),
  editDispatch: (state) => dispatch(editSubmit(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
