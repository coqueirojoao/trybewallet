import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../assets/Button';
import pen from '../media/pen.svg'
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
      <div className='container mt-3 shadow p-4 rounded'>
        <table className='table text-light text-center'>
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
                    <div className='d-flex justify-content-center gap-2'>
                    <img
                    src={pen}
                    width={23}
                      datatestid="edit-btn"
                      onClick={ () => this.handleEdit(id) }
                      className="pointer"
                      alt='editicon'
                    />
                    <Button
                      datatestid="delete-btn"
                      className="btn-close btn-close-white"
                      onClick={ () => this.handleDelete(id) }
                    >
                    </Button>
                    </div>
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
