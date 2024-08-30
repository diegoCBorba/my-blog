import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api';
import { CreateBlogPostPayload } from '@/interfaces/blog';

const createBlogPost = async (payload: CreateBlogPostPayload) => {
  const response = await axios.post(`${API_URL}/blog`, payload);
  return response.data;
};

export function useMutateBlogPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateBlogPostPayload) => createBlogPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['grouped-blogs'],
        refetchType: 'all',
      });
    },
  });

  return mutation;
}
