import { API_URL } from '../api';
import { PropsGroupedBlogs } from '@/interfaces/blog';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const fetchGroupedBlogs = async (): Promise<PropsGroupedBlogs[]> => {
  const response = await axios.get(`${API_URL}/blog/grouped-by-tag`);
  return response.data;
};

export const useGroupedBlogs = (): UseQueryResult<PropsGroupedBlogs[]> => {
  return useQuery<PropsGroupedBlogs[]>({
    queryFn: fetchGroupedBlogs,
    queryKey: ['grouped-blogs'],
  });
};
