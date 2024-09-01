import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../api';
import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  id: number,
	username: string,
	isAdmin: boolean,
}

const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem('access_token', data.access_token);
    },
    onError: (error: any) => {
      console.error('Login failed:', error.message);
    },
  });
};

export default useLogin;
