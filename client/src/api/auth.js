import jwt from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import { API_VERSION, BASE_PATH } from './config';

export const getAccesToken = () => {
    const accesToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accesToken || accesToken === 'null') {
        return null;
    }

    return willExpireToken(accesToken) ? null : accesToken;
};

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken || refreshToken === 'null') {
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
};

const willExpireToken = (token) => {
    const seconds = 60;
    const metaToken = jwt(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;

    return now > exp;
};

export const refreshAccessToken = (refreshToken) => {
    const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
    const payload = {
        refreshToken,
    };

    const params = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(url, params)
        .then((res) => {
            if (res.status !== 200) {
                return null;
            }
            return res.json();
        })
        .then((result) => {
            if (!result) {
                logout();
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        });
};

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};
