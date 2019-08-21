import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    FETCH_RENTAL_INIT,
    FETCH_RENTAL_FAIL,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAIL,
    FETCH_BOOKINGS_INIT
} from './types';
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

const axiosInstance = axiosService.getInstance();

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTAL_INIT
    }
};

const fetchRentalsFail = (errors) => {
    return {
        type: FETCH_RENTAL_FAIL,
        errors
    }
};


export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';
    return function(dispatch){
        dispatch(fetchRentalsInit());
        // send request to server
        axiosInstance.get(url)
            .then((rentals)=>{
            dispatch(fetchRentalsSuccess(rentals.data));
        })
            .catch((err)=>{
                dispatch(fetchRentalsFail(err.response.data.errors));
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
};

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


export const register = (userData) => {
    return axios.post('/api/v1/users/register', userData).then((res)=> {
        return res.data;
    }, (err)=>{
        return Promise.reject(err.response.data.errors);
    });
};


const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
};

export const checkAuthState = () => {

    return dispatch => {
        if(authService.isUserAuthenticated()){
            dispatch(loginSuccess());
            console.log('login true')
        }
    }
};

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData).then((res)=> {
            return res.data;
        }).then((token)=> {
            authService.saveToken(token);
            dispatch(loginSuccess());
        }).catch((err)=>{
            dispatch(loginFailure(err.response.data.errors))
        })
    }
};

export const logout = () => {
    authService.invalidateToken();
    return {
        type: LOGOUT
    }
};

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking).then((res)=> {
        return res.data;
    }).catch((err)=>{
        return Promise.reject(err.response.data.errors);
    })
};

const fetchBookingsInit = () => {
    return {
        type: FETCH_BOOKINGS_INIT
    }
};

const fetchBookingsFail = (errors) => {
    return {
        type: FETCH_BOOKINGS_FAIL,
        errors
    }
};

const fetchBookingsSuccess = (bookings) => {

    return {
        type: FETCH_BOOKINGS_SUCCESS,
        bookings
    }

};

export const fetchBookings = () => {


    return function(dispatch){
        dispatch(fetchBookingsInit());
        // send request to server
        axiosInstance.get('/bookings/manage').then((res)=>{return res.data})
            .then((bookings)=>{
                console.log('success');
                dispatch(fetchBookingsSuccess(bookings));
            })
            .catch((err)=>{
                dispatch(fetchBookingsFail(err.response.data.errors));
            });
    }

};

export const fetchUserRentals = () => {
        return axiosInstance.get('/rentals/manage').then((res)=>{return res.data},
            (err)=>{
                return Promise.reject(err.response.data.errors);
            });
};

export const createRental = (rentalData) => {
    return axiosInstance.post('/rentals', rentalData).then((res)=> {
        return res.data;
    }).catch((errors)=>{
        return Promise.reject(errors.response.data.errors);
    })
};

export const deleteRental = (rentalId) => {
    return axiosInstance.delete(`/rentals/${rentalId}`).then((res)=> {
        return res.data;
    }).catch((errors)=>{
        return Promise.reject(errors.response.data.errors);
    })
};