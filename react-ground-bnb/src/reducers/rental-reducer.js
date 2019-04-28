import {FETCH_RENTAL_BY_ID, FETCH_RENTALS} from '../actions/types'

const INITIAL_STATE= {
    rentals: {
       data: []
    },
    rental: {
        data: []
    },
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
    debugger;
    switch(action.type) {

        default: return state;

        case(FETCH_RENTALS):

            return {...state, data: action.rentals}

    }

};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
    debugger;
    switch(action.type) {

        default: return state;

        case(FETCH_RENTAL_BY_ID):

            return {...state, data: action.rental}

    }

};