import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';

import * as actions from '../../../actions';

class RentalListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section className="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="rentalContainer">
          <RentalList rentals={this.props.rentals} />
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals.data
  }
}

export default connect(mapStateToProps)(RentalListing)