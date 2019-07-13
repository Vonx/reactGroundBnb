import React from 'react'
import { Field, reduxForm } from 'redux-form';

const RegisterForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitCb} = props
    return (
        <form onSubmit={handleSubmit((submitCb)=>{
            debugger;

        })}>
            <div>
                <label>User Name</label>
                <div>
                    <Field
                        name="username"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Password</label>
                <div>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Confirmation Password</label>
                <div>
                    <Field
                        name="conformationPassword"
                        component="input"
                        type="password"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <button className="btn btn-bwm btn-form" type="submit" disabled={pristine || submitting}>
                    Submit
                </button>

            </div>
        </form>
    )
};

export default reduxForm({
    form: 'registerForm' // a unique identifier for this form
})(RegisterForm)
