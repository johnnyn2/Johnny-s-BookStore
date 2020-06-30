export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
export const ACCESS_TOKEN = 'accessToken';
export const COLORS = {
    FONTS: {
        BLACK: 'rgba(0, 0, 0, 0.87)'
    }
}
export const SIGNUP = {
    name: {
        min: 4,
        max: 40,
        helperText: ""
    },
    username: {
        min: 3,
        max: 15,
        helperText: ""
    },
    password: {
        min: 6,
        max: 20,
        helperText: ""
    },
    email: {
        min: 1,
        max: 40,
        helperText: ""
    }
}