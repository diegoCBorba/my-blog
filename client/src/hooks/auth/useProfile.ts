import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api';

interface UserProfile {
  userId: number;
  username: string;
  isAdmin: boolean;
}

const fetchProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  
  const response = await axios.post(
    `${API_URL}/auth/profile`, {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: !!localStorage.getItem('access_token'),
  });
};
