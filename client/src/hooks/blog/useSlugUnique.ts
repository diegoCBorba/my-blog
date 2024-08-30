import { API_URL } from '../api';
import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchSlugUnique = async (slug: string): Promise<{ isUnique: boolean }> => {
  const response = await axios.get(`${API_URL}/blog/${slug}/isUnique`);
  return response.data;
};

export const useSlugUnique = (slug: string): UseQueryResult<{ isUnique: boolean }> => {
  return useQuery({
    queryFn: () => fetchSlugUnique(slug),
    queryKey: ['slug-unique', slug],
    enabled: !!slug, 
  });
};
