import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { fetchCurrenciesAction } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  render() {
    return (
      <div>
        <div className='shadow-lg pb-5 rounded'>
        <Header />
        <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrenciesAction()),
});

export default connect(null, mapDispatchToProps)(Wallet);
