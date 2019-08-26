import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {bwmTextArea, bwmSelect, formInput} from '../../shared/form/bwmSelect';
import {bwmFileUpload} from "../../shared/form/bwmFileUpload";

import {DisplayError} from '../../shared/form/displayError';
import {required, minLength4, isNum} from '../../shared/form/validators';

const RentalCreateForm = props => {
    const { handleSubmit, pristine, submitting, submitRentalCb, valid, rentalCategories, errors} = props;
    return (

        <form onSubmit={handleSubmit((submitRentalCb))}>
            <Field
                name="title"
                label="Title"
                placeholder="Title"
                rows="1"
                className="form-control"
                component={formInput}
                validate={[required]}
            />
            <Field name="description"
                   label="Desciption"
                   rows="3"
                   className="form-control"
                   component={bwmTextArea}/>
            <Field
                name="city"
                label="City"
                placeholder="City"
                rows="1"
                className="form-control"
                component={formInput}
                validate={[required]}
            />
            <Field
                name="street"
                label="Street"
                placeholder="Street"
                rows="1"
                className="form-control"
                component={formInput}
                validate={[required, minLength4]}
            />
            <Field
                options={rentalCategories}
                name="category"
                label="Category"
                component={bwmSelect}
                className="form-control">
            </Field>
            <Field
                name="bedrooms"
                label="Bedrooms"
                placeholder="Bedrooms"
                rows="1"
                className="form-control"
                component={formInput}
                validate={[required, isNum]}
            />
            <Field
                name="shared"
                label="Shared?"
                id="shared"
                component={formInput}
                type="checkbox"
            />

            <Field
                name="dailyRate"
                label="Daily rate"
                symbol='$'
                className="form-control"
                component={formInput}
                validate={[required, isNum]}
            />
            <Field
                name="image"
                label="Image"
                component={bwmFileUpload}
            />
            <button className="btn btn-bwm" type="submit" disabled={!valid || pristine || submitting}>
                Create Rental
            </button>
            <DisplayError errors={errors} />
        </form>
    )
};

export default reduxForm({
    form: 'rentalCreateForm',
    initialValues: { shared: false, category: "Home"}
})(RentalCreateForm)