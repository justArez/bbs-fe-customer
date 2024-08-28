import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { reset, accountType, isLogout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const at = Cookies.get('badmintion-at');
    const rf = Cookies.get('badmintion-rft');
    const roleId = accountType?.role?.id;

    useEffect(() => {
        if (!((rf && rf.length > 0) || (at && at.length > 0))) {
            reset();
            if (!(roleId && roleId > 5)) {
                if (!isLogout) {
                    navigate('/login', {
                        replace: true,
                        state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' },
                    });
                } else {
                    navigate('/login', { replace: true });
                }
            }
        } else if (roleId && roleId < 6 && roleId > 2 && location.pathname.includes('system')) {
            navigate('/dashboard', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, at, rf, roleId]);

    return <>{((rf && rf.length > 0) || (at && at.length > 0)) && roleId && roleId < 6 && children}</>;
};

export default WithAuthencation;