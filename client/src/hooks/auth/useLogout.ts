import { useAuth } from '@/contexts/AuthContext';

const useLogout = () => {
  const { setAuthInfo } = useAuth();

  const logout = () => {
    localStorage.removeItem('access_token');

    setAuthInfo({
      isAdmin: false,
      isLogged: false,
      username: '',
      id: 0,
    });
  };

  return logout;
};

export default useLogout;
