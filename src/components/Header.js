import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wallet from '../media/wallet.svg'
import { connect } from 'react-redux';

class Header extends Component {
  handleTotalExpenses = () => {
    const {
      expensesInfo: { expenses },
    } = this.props;
    const totalValue = expenses.map(({ currency, exchangeRates, value }) => (
      +exchangeRates[currency].ask * value
    ));
    let totalSum = 0;
    totalValue.forEach((e) => {
      totalSum += +e;
    });
    return totalSum.toFixed(2);
  };

  render() {
    const {
      userInfo: { email },
      expensesInfo: { expenses },
    } = this.props;
    const initialValue = 0;
    return (
      <div className='container-fluid text-light d-flex justify-content-evenly align-items-baseline p-5 fs-6 flex-wrap gap-5'>
        <img src={wallet} width={50} alt='logo' />
        <div className='d-flex justify-content-end w-50 gap-2'>
        <span data-testid="total-field" className='badge bg-success'>
          {expenses.length === 0 ? `${initialValue.toFixed(2)} BRL` : `${this.handleTotalExpenses()} BRL`}
        </span>
        <span data-testid="email-field" className='badge bg-secondary'>
          {email}
        </span>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user,
  expensesInfo: state.wallet,
});

Header.propTypes = {
  expensesInfo: PropTypes.shape({
    expenses: PropTypes.shape([]).isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Header);
