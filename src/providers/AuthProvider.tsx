import { useGetSessionUserMutation, useRefreshTokenMutation } from '@/features/auth';
import { resetAuthStore } from '@/libs/helper';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setAccountType, setIsAuth } = useAuthStore();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionUserMutation.mutate({});
        },
    });

    const sessionUserMutation = useGetSessionUserMutation({
        onSuccess: (data: any) => {
            if (data.user.status === 1) {
                setAccountType({
                    role: { id: data.user.roleId, name: 'Member' },
                    user: data.user,
                });
                setIsAuth(true);
            } else resetAuthStore();
        },
        onError: () => {
            if (Cookies.get('badminton-at')) {
                sessionUserMutation.mutate({});
            }
        },
    });

    useEffect(() => {
        const rft = Cookies.get('badminton-rft');
        const at = Cookies.get('badminton-at');
        if (at) {
            sessionUserMutation.mutate({});
        } else {
            if (rft) {
                refreshTokenMutation.mutate({});
            } else {
                sessionStorage.removeItem('badminton-session');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}