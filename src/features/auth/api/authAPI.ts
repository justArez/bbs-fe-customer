import * as httpRequest from '@/libs/axios';
import * as httpAuth from '@/libs/axios-auth';
import Cookies from "js-cookie";
import { ILogin, IRefreshToken, ISession, ISessionUser, LoginCredentials } from "../types";
import { IUser, getUser } from '@/features/users';
import { useMutation } from '@tanstack/react-query';

const login = async (credentials: LoginCredentials): Promise<ILogin> => {
    try {
        const resLogin: ILogin = await httpRequest.post('/auth/login', credentials);
        Cookies.set('badminton-rft', resLogin.token.refreshToken, {
            expires: new Date(resLogin.token.refreshTokenExp * 1000),
        });
        Cookies.set('badminton-at', resLogin.token.accessToken, {
            expires: new Date(resLogin.token.accessTokenExp * 1000),
        });
        const resSessionUser = await getSessionUser();

        return { ...resLogin, session: resSessionUser.session, user: resSessionUser.user };
    } catch (e: any) {
        throw new Error(e.error);
    }
};

// const logout = async (): Promise<ILogout> => {
//     try {
//         const refreshToken = Cookies.get('badminton-rft');
//         const res: ILogout = await httpRequest.post('/auth/logout', { refreshToken });
//         Cookies.remove('badminton-rft');
//         Cookies.remove('badminton-at');
//         sessionStorage.removeItem('badminton-session');
//         return res;
//     } catch (e: any) {
//         throw new Error(e.error);
//     }
// };

export const refreshToken = async (): Promise<IRefreshToken> => {
    try {
        const refreshToken = Cookies.get('badminton-rft');
        const res: IRefreshToken = await httpRequest.post('/auth/refresh', { refreshToken });
        Cookies.set('badminton-at', res.accessToken, { expires: new Date(res.accessTokenExp * 1000) });
        return res;
    } catch (e: any) {
        throw new Error(e.error);
    }
};

const getSessionUser = async (): Promise<ISessionUser> => {
    try {
        const resSession: ISession = await httpAuth.get('/auth/session');
        const resUser: IUser = await getUser();
        sessionStorage.setItem('badminton-session', resSession.sessionId);
        return { session: resSession, user: resUser };
    } catch (e: any) {
        throw new Error(e.error);
    }
};


export const useLoginMutation = (
    handleFn: {
        onError?: (error: unknown, variables: LoginCredentials, context: unknown) => void;
        onSuccess?: (data: ILogin, variables: LoginCredentials, context: unknown) => void;
        onMutate?: (variables: LoginCredentials) => Promise<ILogin>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};


export const useRefreshTokenMutation = (
    handleFn: {
        onError?: (error: unknown, variables: unknown, context: unknown) => void;
        onSuccess?: (data: IRefreshToken, variables: unknown, context: unknown) => void;
        onMutate?: () => Promise<IRefreshToken>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: refreshToken,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useGetSessionUserMutation = (
    handleFn: {
        onError?: (error: unknown, variables: unknown, context: unknown) => void;
        onSuccess?: (data: ISessionUser, variables: unknown, context: unknown) => void;
        onMutate?: (variables: unknown) => Promise<ISessionUser>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: getSessionUser,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};
