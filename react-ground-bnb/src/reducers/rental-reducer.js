import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_LOADING,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS} from '../actions/types'

const INITIAL_STATE= {
    rentals: {
       data: []
    },
    rental: {
        data: []
    },
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
    switch(action.type) {

        default: return state;

        case(FETCH_RENTALS_SUCCESS):
            return {...state, data: action.rentals}

    }

};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
    switch(action.type) {

        default: return state;

        case(FETCH_RENTAL_BY_ID_INIT):
            return {...state, data: {}}
        case(FETCH_RENTAL_BY_ID_SUCCESS):

            return {...state, data: action.rental}

        case(FETCH_RENTAL_LOADING):

            return {...state, data: action.rental}

    }

};