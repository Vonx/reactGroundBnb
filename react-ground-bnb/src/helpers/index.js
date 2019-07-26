import titleize from 'titleize';
import * as moment from 'moment';

// if isShared is true, return shared, otherwise return entire
export const rentalType = (isShared) => {
    return isShared ? 'shared' : 'entire';
};

// if a string is not empty, titleize it, otherwise return an empty string
export const toUpperCase = (value) => {
    return value ? titleize(value) : '';
};

export const getRangeOfDates = (startAt, endAt, dateFormat) => {

    const tempDate = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt){

        tempDate.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day')
    }
    tempDate.push(mEndAt.format(dateFormat));
    return tempDate;

};