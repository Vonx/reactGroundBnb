import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { RentalCard } from './RentalCard';

class RentalDetail extends React.Component {

    componentWillMount() {
        const rentalId = this.props.match.params.id;


        this.props.dispatch(actions.fetchRentalById(rentalId));

    }

    render(){
        const rental = this.props.rental;

        if(rental.id) {
            return (
                <RentalCard
                    colNum='col-md-3 col-xs-6'
                    rental={rental}
                />
            );
        }
        else{
            return (
                <div>Loading..</div>
            )
        }
    }
}

function mapStateToProps(state){

    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail);