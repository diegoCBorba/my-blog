import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api';
import { CreateCommentPayload } from '@/interfaces/comment';

const createComment = async (payload: CreateCommentPayload) => {
  const response = await axios.post(`${API_URL}/comment`, payload);
  return response.data;
};

export function useMutateComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateCommentPayload) => createComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
        refetchType: 'all',
      });
    },
  });

  return mutation;
}
