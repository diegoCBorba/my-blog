import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
}

const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterData) => registerUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['grouped-blogs'],
        refetchType: 'all',
      });
    },
  });
};
