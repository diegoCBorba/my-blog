import { API_URL } from '../api';
import { BlogPostResponse } from '@/interfaces/blog';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// Função para buscar um blog específico por slug
const fetchBlogBySlug = async (slug: string): Promise<BlogPostResponse> => {
  const response = await axios.get(`${API_URL}/blog/${slug}`);
  return response.data;
};

// Hook para usar a busca de blog por slug
export const useBlogBySlug = (slug: string): UseQueryResult<BlogPostResponse> => {
  return useQuery<BlogPostResponse>({
    queryFn: () => fetchBlogBySlug(slug),
    queryKey: ['blog', slug],
    enabled: !!slug, // Garante que a consulta só seja feita se o slug estiver definido
  });
};
