import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../assets/Button';
import { deleteExpenseAction, enableEditForm } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { deleteDispatch } = this.props;
    deleteDispatch(id);
  };

  handleEdit = (id) => {
    const { enableEditFormDispatch } = this.props;
    enableEditFormDispatch(id);
  };

  render() {
    const {
      expensesInfo: { expenses },
    } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({
                currency,
                value,
                exchangeRates,
                description,
                tag,
                method,
                id,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{(+value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(+value * +exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <Button
                      datatestid="edit-btn"
                      onClick={ () => this.handleEdit(id) }
                    >
                      Editar
                    </Button>
                    <Button
                      datatestid="delete-btn"
                      onClick={ () => this.handleDelete(id) }
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  deleteDispatch: PropTypes.func.isRequired,
  enableEditFormDispatch: PropTypes.func.isRequired,
  expensesInfo: PropTypes.shape({
    expenses: PropTypes.shape({
      map: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expensesInfo: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (state) => dispatch(deleteExpenseAction(state)),
  enableEditFormDispatch: (id) => dispatch(enableEditForm(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
