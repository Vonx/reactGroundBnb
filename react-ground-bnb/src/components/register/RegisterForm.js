import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {formInput} from '../shared/form/formInput';
import {DisplayError} from '../shared/form/displayError';

const RegisterForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitCb, valid, errors} = props;
    return (
        <form onSubmit={handleSubmit((submitCb))}>
                    <Field
                        name="username"
                        type="text"
                        label="Username"
                        placeholder="First Name"
                        className="form-control"
                        component={formInput}
                    />

                    <Field
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        className="form-control"
                        component={formInput}
                    />

                    <Field
                        name="password"
                        type="password"
                        label="Password"
                        className="form-control"
                        component={formInput}
                    />
                    <Field
                        name="passwordConfirmation"
                        type="password"
                        label="Password Confirmation"
                        className="form-control"
                        component={formInput}
                    />
                <button className="btn btn-success" type="submit" disabled={!valid || pristine || submitting}>
                    Submit
                </button>
            <DisplayError errors={errors}/>
        </form>
    )
};

const validate = values => {
  const errors = {};

  if(values.username && values.username.length < 4) {
      errors.username = "Username min length requirement is 4 characters";
  }

    if (!values.email) {
        errors.email = 'Required';
    }
    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Enter password confirmation';
    }

    if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must match';
    }

    return errors;
};


export default reduxForm({
    form: 'registerForm',
    validate// a unique identifier for this form
})(RegisterForm)
