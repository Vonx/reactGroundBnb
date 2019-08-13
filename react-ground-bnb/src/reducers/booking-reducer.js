import {
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_INIT,
    FETCH_BOOKINGS_FAIL,
} from '../actions/types';

const INITIAL_STATE= {
        data: [],
        errors: []
};

export const bookingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        default: return state;

        case(FETCH_BOOKINGS_INIT):
            return {...state, data: [], errors: []};
        case(FETCH_BOOKINGS_SUCCESS):
            return {...state, data: action.bookings, errors: []};
        case(FETCH_BOOKINGS_FAIL):
            return {...state, data: [], errors: []}

    }

};