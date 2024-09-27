import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api';
import { CreateBlogPostPayload } from '@/interfaces/blog';

const createBlogPost = async (payload: CreateBlogPostPayload) => {
  const formData = new FormData();
  
  formData.append('title', payload.title);
  if (payload.cover) {
    formData.append('cover', payload.cover);
  }
  formData.append('content', payload.content);
  formData.append('description', payload.description);
  formData.append('slug', payload.slug);
  formData.append('tagId', payload.tagId.toString());
  formData.append('authorId', payload.authorId.toString());
  
  const response = await axios.post(`${API_URL}/blog`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
