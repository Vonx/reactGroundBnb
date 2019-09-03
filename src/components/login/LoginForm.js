import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {formInput} from '../shared/form/formInput';
import {DisplayError} from '../shared/form/displayError';
import {required, minLength4} from '../shared/form/validators';

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitLoginCb, valid, errors} = props;
    return (
        <form onSubmit={handleSubmit((submitLoginCb))}>
            <Field
                name="email"
                label="Email"
                placeholder="Email"
                className="form-control"
                component={formInput}
                validate={[required, minLength4]}
            />

            <Field
                name="password"
                type="password"
                label="Password"
                className="form-control"
                component={formInput}
                validate={[required]}
            />
            <button className="btn btn-success" type="submit" disabled={!valid || pristine || submitting}>
                Login
            </button>
            <DisplayError errors={errors} />
        </form>
    )
};

export default reduxForm({
    form: 'loginForm'
})(LoginForm)
