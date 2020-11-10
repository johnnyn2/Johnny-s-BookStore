export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://192.168.232.172:8080/api';
export const ACCESS_TOKEN = 'accessToken';
export const COLORS = {
    FONTS: {
        BLACK: 'rgba(0, 0, 0, 0.87)'
    }
}
export const SIGNIN = {
    usernameOrEmail: {
        min: 3,
        max: 40,
        regex: null,
        helperText: ""
    },
    password: {
        min: 6,
        max: 20,
        helperText: "",
        regex: null,
    }
}
export const SIGNUP = {
    name: {
        min: 4,
        max: 40,
        helperText: "",
        regex: null,
    },
    username: {
        min: 3,
        max: 15,
        helperText: "",
        regex: null,
    },
    password: {
        min: 6,
        max: 20,
        helperText: "",
        regex: null,
    },
    email: {
        min: 1,
        max: 40,
        helperText: "Invalid email address. Example: HelloWorld@gmail.com",
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
}
export const getAlreadyExistErrorText = (field) => `${field} already exists`;
export const getFieldLengthErrText = (length, min, max) => {
    if (min !==0 && length === 0) {
        return 'This field should not be empty';
    } else if (length < min || length > max) {
        return `This field should have at least ${min} and at most ${max} characters`;
    }
}
export const ITEMS_PER_ROW = 3;
export const ROWS_PER_PAGE = 3;