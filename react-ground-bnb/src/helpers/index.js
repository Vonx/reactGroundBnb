import titleize from 'titleize';

// if isShared is true, return shared, otherwise return entire
export const rentalType = (isShared) => {
    return isShared ? 'shared' : 'entire';
};

// if a string is not empty, titleize it, otherwise return an empty string
export const toUpperCase = (value) => {
    return value ? titleize(value) : '';
};