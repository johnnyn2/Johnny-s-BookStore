import {API_BASE_URL, ACCESS_TOKEN} from '../constants/constants';
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => response.json().then(json => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }))
}

export const signin = (data) => {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const signup = (data) => {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const checkUsernameAvailability = (username) => {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    })
}

export const checkEmailAvailability = (email) => {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    })
}

export const getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No Access Token");
    }

    return request({
        url: API_BASE_URL + '/user/me',
        method: 'GET'
    });
}

export const getAllCategories = () => {
    return request({
        url: API_BASE_URL + "/category/all",
        method: 'GET'
    });
}

export const getBooksByCategory = ({categoryId, page, size}) => {
    return request({
        url: API_BASE_URL + "/books/getBooksByCategory",
        method: 'POST',
        body: JSON.stringify({categoryId, page, size})
    })
}

export const getAllBooks = ({page, size}) => {
    return request({
        url: API_BASE_URL + "/books/getAllBooks",
        method: 'POST',
        body: JSON.stringify({page, size})
    })
}

export const searchBooksByFilter = ({categoryId, title, authorName, page, size}) => {
    return request({
        url: API_BASE_URL + '/books/searchBooksByFilter',
        method: 'POST',
        body: JSON.stringify({categoryId, title, authorName, page, size})
    })
}