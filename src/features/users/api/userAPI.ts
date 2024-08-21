
import * as httpAuth from '@/libs/axios-auth';

import { IUser } from '../types';
export const getUser = async (): Promise<IUser> => {
    try {
        const resUser = await httpAuth.get(`/users/profile`);
        return resUser;
    } catch (e: any) {
        throw new Error(e.error);
    }
};