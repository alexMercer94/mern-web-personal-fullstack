import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { getAccesToken, getRefreshToken, logout, refreshAccessToken } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({
        user: null,
        isLoading: true,
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

/**
 * Verify is user is logged
 * @param {*} setUser
 */
const checkUserLogin = (setUser) => {
    const accessToken = getAccesToken();
    if (!accessToken) {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            logout();
            setUser({
                user: null,
                isLoding: false,
            });
        } else {
            refreshAccessToken(refreshToken);
        }
    } else {
        setUser({
            user: jwtDecode(accessToken),
            isLoading: false,
        });
    }
};
