import { API_URL } from '../api';
import { Tag } from '@/interfaces/tag';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const fetchTags = async (): Promise<Tag[]> => {
  const response = await axios.get(`${API_URL}/tag`);
  return response.data;
};

export const useTags = (): UseQueryResult<Tag[]> => {
  return useQuery<Tag[]>({
    queryFn: fetchTags,
    queryKey: ['tags'],
  });
};
