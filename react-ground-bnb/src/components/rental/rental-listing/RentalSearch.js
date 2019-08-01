import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import {RentalList} from "./RentalList";

class RentalSearch extends React.Component {

    constructor(){
        super();

        this.state = {
            city: ''
        }

    }

    componentWillMount() {
        const city = this.props.match.params.city;
        console.log(city);
        this.setState({city});
        this.props.dispatch(actions.fetchRentals(city));
    }

    renderTitle(){
        const {errors, data} = this.props.rentals;
        const {city} = this.state;
        let title = '';

        if(errors.length > 0){
          title = errors[0].detail;
        }
        if(data.length > 0){
            title = `Your Home in ${this.state.city}`;
        }

        return <h1 className="page-title">{title}</h1>
        }

    render() {
        return (
            <section id="rentalListing">
                {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearch);