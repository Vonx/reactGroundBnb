import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import {RentalList} from "./RentalList";
import {toUpperCase} from "../../../helpers";
import {Link} from 'react-router-dom';

class RentalSearch extends React.Component {

    constructor(){
        super();

        this.state = {
            city: ''
        }

    }

    componentWillMount() {
        this.searchRentalByCity();
    }

    searchRentalByCity(){
        const city = this.props.match.params.city;
        console.log(city);
        this.setState({city});
        this.props.dispatch(actions.fetchRentals(city));
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.city !== this.props.match.params.city){
            this.searchRentalByCity()
        }
    }

    renderTitle(){
        const {errors, data} = this.props.rentals;
        let title = '';

        if(errors.length > 0){
          title = errors[0].detail;
        }
        if(data.length > 0){
            title = `Your Home in ${toUpperCase(this.state.city)}`;
        }

        return <h1 className="page-title">{title}</h1>
        }

    render() {
        const {errors} = this.props.rentals;
        return (
            <section className="rentalListing">
                {this.renderTitle()}
                <div className="rentalContainer">
                <RentalList rentals={this.props.rentals.data} />
                    {errors.length > 0 && <p>Want to check out some other popular places? <Link to='/rentals'><button className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search'>EXplore</button></Link></p>}
                </div>
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