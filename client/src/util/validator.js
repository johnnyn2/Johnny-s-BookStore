export const validator = (value, min, max, regex, helperText) => {
    const length = value.length;
    let result = {
        error: false,
        errorText: "",
    }
    const regExp = new RegExp(regex);
    if (min !==0 && length === 0) {
        result.error = true;
        result.errorText = `This field should not be empty`;
        if (result.error) {
            return result;
        } else if (!regExp.test(value)) {
            result.error = true;
            result.errorText = helperText;
            return result;
        }
    } else if( length < min || length > max ) {
        result.error = true;
        result.errorText = `This field should have at least ${min} and at most ${max} characters.`;
        if (result.error) {
            return result;
        } else if (!regExp.test(value)) {
            result.error = true;
            result.errorText = helperText;
            return result;
        }
    }
}