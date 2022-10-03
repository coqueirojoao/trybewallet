import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div>
        <h1>Header</h1>
        <span data-testid="email-field">
          Email:
          {' '}
          {email}
        </span>
        <span data-testid="total-field">
          {expenses.length === 0 ? initialValue.toFixed(2) : this.handleTotalExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
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
