import { API_VERSION, BASE_PATH } from './config';

/**
 * Service to register a user
 * @param {*} data Data
 */
export const signUpApi = (data) => {
    const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (result.user) {
                return {
                    ok: true,
                    message: 'Usuario creado correctamente',
                };
            }
            return {
                ok: false,
                message: result.message,
            };
        })
        .catch((error) => {
            return {
                ok: false,
                message: error.message,
            };
        });
};

export const signInApi = (payload) => {
    const url = `${BASE_PATH}/${API_VERSION}/sign-in`;

    const params = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return {
                ok: false,
                message: error.message,
            };
        });
};
