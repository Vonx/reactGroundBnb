

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

export const isNum = num =>
    num && !parseInt(num) ? `Must be a number` : undefined

export const minLength4 = minLength(4);

export const required = (value) => {

    return value ? undefined : "this input is required";
};