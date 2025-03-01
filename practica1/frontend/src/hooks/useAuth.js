import { useDispatch, useSelector } from 'react-redux';

import { onChecking, onLogin, onLogout } from '../store'
import { appApi } from '../api/appApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {

    const { status, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await appApi.post('/auth/login', { email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({
                id: data.id,
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                username: data.username,
                role: data.role,
            }));

            console.log(user)

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

            dispatch( onLogin({
                id: data.id,
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                username: data.username,
                role: data.role,
            }));

            navigate('/dashboard');

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