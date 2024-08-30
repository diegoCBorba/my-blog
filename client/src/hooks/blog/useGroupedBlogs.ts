import { API_URL } from '../api';
import { GroupedBlogsResponse } from '@/interfaces/blog';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const fetchGroupedBlogs = async (): Promise<GroupedBlogsResponse[]> => {
  const response = await axios.get(`${API_URL}/blog/grouped-by-tag`);
  return response.data;
};

export const useGroupedBlogs = (): UseQueryResult<GroupedBlogsResponse[]> => {
  return useQuery<GroupedBlogsResponse[]>({
    queryFn: fetchGroupedBlogs,
    queryKey: ['grouped-blogs'],
  });
};
