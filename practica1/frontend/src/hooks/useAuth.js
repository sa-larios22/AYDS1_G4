import { useDispatch, useSelector } from 'react-redux';
import { onChecking, onLogin, onLogout } from '../store';
import { appApi } from '../api/appApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { status, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await appApi.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({
        id: data.id,
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        role: data.role,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const startCheckToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout());
    }
    try {
      const { data } = await appApi.get('auth/check-status');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({
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
  };

  const startLogOut = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  // Nueva función para actualizar los datos del usuario
  const startUpdateUser = async (updatedUserData) => {
    try {
      const { data } = await appApi.patch(`/auth/${user.id}`, updatedUserData);
  
      // Actualiza el estado global con los datos actualizados
      dispatch(onLogin({
        id: data.id,
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        role: data.role,
      }));
  
      // Devuelve los datos actualizados
      return data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
  
      // Lanza un error con un mensaje claro
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al actualizar el usuario. Inténtalo de nuevo."
      );
    }
  };

  return {
    status,
    user,
    startLogin,
    startCheckToken,
    startLogOut,
    startUpdateUser, 
  };
};
