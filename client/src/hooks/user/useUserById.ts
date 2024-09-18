import { API_URL } from '../api';
import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  blogId: number;
  userId: number;
}

interface User {
  id: number;
  login: string;
  password: string;
  name: string;
  username: string;
  isAdmin: boolean;
  comments: Comment[];
}

const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return response.data;
};

export const useUserById = (id: number): UseQueryResult<User> => {
  return useQuery({
    queryFn: () => fetchUserById(id),
    queryKey: ['user', id],
    enabled: !!id,
  });
};

