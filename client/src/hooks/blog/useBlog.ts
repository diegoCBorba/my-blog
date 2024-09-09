import { API_URL } from '../api';
import { BlogsResponse } from '@/interfaces/blog';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const fetchBlogs = async (page: number = 1, limit: number = 9, tagId?: number, search?: string): Promise<BlogsResponse> => {
  const response = await axios.get(`${API_URL}/blog`, {
    params: {
      page,
      limit,
      tagId,
      search,
    },
  });
  return response.data;
};

// Hook para usar a busca de blogs com paginação, filtro por tagId e search
export const useBlogs = (
  page: number = 1,
  limit: number = 9,
  tagId?: number,
  search?: string
): UseQueryResult<BlogsResponse> => {
  return useQuery<BlogsResponse>({
    queryFn: () => fetchBlogs(page, limit, tagId, search),
    queryKey: ['blogs', page, limit, tagId, search],
    staleTime: 5000,
    retry: 2,
  });
};
