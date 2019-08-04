import React from 'react';


export const bwmSelect = ({
                                input,
                                label,
                                type, rows,
                                className,
                                options,
                                meta: { touched, error, warning }
                            }) => {

    function displayOptions() {
        return options.map((option, index) => {

            return <option key={index} value={option}>{option}</option>
        });
    }

        return (<div className="form-group">
            <label>{label}</label>
            <div className='input-group'>
                <select {...input} rows={rows} className={className}>
                    {displayOptions()}
                </select>
            </div>
            {touched &&
            ((error && <div className="alert alert-danger">{error}</div>))}
        </div>)
    };

export const bwmTextArea = ({
                                input,
                                label,
                                type, rows,
                                className,
                                meta: { touched, error, warning }
                            }) => (
    <div className = "form-group">
        <label>{label}</label>
        <div className = 'input-group'>
            <textarea {...input} type={type} rows={rows} className={  className}/>
        </div>
        {touched &&
        ((error && <div className="alert alert-danger">{error}</div>))}
    </div>
);

export const formInput = ({
                              input,
                              label,
                              type,
                              className,
                              symbol,
                              meta: { touched, error, warning }
                          }) => (
    <div className = "form-group">
        <label>{label}</label>
        <div className = 'input-group'>
            {symbol &&
            <div className='input-group-prepend'>
                <div className='input-group-text'>{symbol}</div>
            </div>}
            <input {...input} type={type} className={className}/>
        </div>
        {touched &&
        ((error && <div className="alert alert-danger">{error}</div>))}
    </div>
);