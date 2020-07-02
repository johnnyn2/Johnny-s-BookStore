import {getFieldLengthErrText} from '../constants/constants';

export const validator = (value, min, max, helperText, regex) => {
    const length = value.length;
    let result = {
        error: false,
        errorText: "",
    }

    if (min !==0 && length === 0) {
        result.error = true;
        result.errorText = getFieldLengthErrText(length, min, max);
        return validateRegex(regex, value, result, helperText);
    } else if( length < min || length > max ) {
        result.error = true;
        result.errorText = getFieldLengthErrText(length, min, max);
        return validateRegex(regex, value, result, helperText);
    } else {
        return validateRegex(regex, value, result, helperText);
    }
}
export const validateRegex = (regExp, value, result = {error: false, errorText: ""}, helperText) => {
    if (result.error) {
        return result;
    } else if (regExp !== null && !regExp.test(value)) {
        result.error = true;
        result.errorText = helperText;
        return result;
    } else {
        return result;
    }
}