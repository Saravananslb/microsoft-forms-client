import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get(`/auth/validate`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const createFormUser = async(body) => {
    return await axios.post('/form/new', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const createFormUserResponse = async(body) => {
    return await axios.post('/form/add-response', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getUserForms = async(formId, action) => {
    let formid = formId ? formId : '';
    return await axios.get(`/form/get?formId=${formid}&formAction=${action}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getUserResponses = async(formId) => {
    return await axios.get(`/form/get-response?formId=${formId}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const updateUserForm = async(body) => {
    return await axios.put(`/form/update`, body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}