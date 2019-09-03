import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

class authService {

    TOKEN_NAME = 'auth_token';

    getToken() {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    getExpiration(token){

    const tokenExp = jwt.decode(token).exp;

    return moment.unix(tokenExp);

    }

    saveToken(token){
        localStorage.setItem(this.TOKEN_NAME, token);
    }

    invalidateToken(){
        localStorage.removeItem(this.TOKEN_NAME);

    }

    getUserName(){
        return jwt.decode(this.getToken()).username;
    }

    isValid(token){
    return moment().isBefore(this.getExpiration(token));

    }

    isUserAuthenticated(){

        const token = this.getToken();

        return (token && this.isValid(token));

    }
}

export default new authService();