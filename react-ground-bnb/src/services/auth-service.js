import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import {isMoment} from "moment";

class authService {


    getExpiration(token){

    const tokenExp = jwt.decode(token).exp;

    return moment.unix(tokenExp);

    }

    isValid(token){
    return moment().isBefore(this.getExpiration(token));

    }

    isUserAuthenticated(){

        const token = localStorage.getItem('auth_token');

        return (token && this.isValid(token));

    }
}

export default new authService();