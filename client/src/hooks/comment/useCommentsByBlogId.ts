import { API_URL } from '../api';
import { CommentResponse } from '@/interfaces/comment';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const fetchCommentsByBlogId = async (idBlog: number): Promise<CommentResponse[]> => {
  const response = await axios.get(`${API_URL}/comment/${idBlog}`);
  return response.data;
};

export const useCommentsByBlogId = (idBlog: number): UseQueryResult<CommentResponse[]> => {
  return useQuery<CommentResponse[]>({
    queryFn: () => fetchCommentsByBlogId(idBlog),
    queryKey: ['comments', idBlog],
    enabled: !!idBlog, // Garante que a consulta só seja feita se o idBlog estiver definido
  });
};
