import {FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTALS_SUCCESS} from './types';
import axios from 'axios';


export const fetchRentals = () => {
    return function(dispatch){

        // send request to server
        axios.get('http://localhost:3000/api/v1/rentals').then((rentals)=>{
            dispatch(fetchRentalsSuccess(rentals.data));
        });
    }

};

export const fetchRentalById = (rentalId) => {
return function(dispatch){

    // send request to server
    dispatch(fetchRentalByIdInit());

    axios.get(`http://localhost:3000/api/v1/rentals/${rentalId}`).then((rental)=>{
        dispatch(fetchRentalByIdSuccess(rental.data));
    });
}

};

const fetchRentalByIdInit = () => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {

return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
}

};

const fetchRentalsSuccess = (rentals) => {

    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }

};
