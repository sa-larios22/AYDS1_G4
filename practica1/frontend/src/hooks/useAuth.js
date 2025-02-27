import { useSelector, useDispatch } from 'react-redux';

import { onChecking, onLogin, onLogout } from '../store'
import { appApi } from '../api/appApi';

export const useAuth = () => {

    const { status, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await appApi.post('/auth/login', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            const { user: userData } = data;

            dispatch( onLogin({
                id: userData.id,
                email: userData.email,
                name: userData.name,
                lastname: userData.lastname,
                username: userData.username,
                role: userData.role,
            }));

        } catch (error) {
            console.log(error);

        }

    }

    const startCheckToken = async() => {
        const token = localStorage.getItem('token');

        if (!token) {
            return dispatch(onLogout());
        }

        try {
            
            const { data } = await appApi.get('auth/check-status');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            const { user: userData } = data;

            dispatch( onLogin({
                id: userData.id,
                email: userData.email,
                name: userData.name,
                lastname: userData.lastname,
                username: userData.username,
                role: userData.role,
            }));

        } catch (error) {
            console.log(error);
        }

    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        status,
        user,
        startLogin,
        startCheckToken,
        startLogOut
    }

}