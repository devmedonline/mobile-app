import { useQuery } from '@tanstack/react-query';
import { GetPostByIdParams, getPostById } from './get-post-by-id';

export const POST_BY_ID_QUERY_KEY = 'POST_BY_ID_QUERY_KEY';

export function usePostByIdQuery(options: GetPostByIdParams) {
  return useQuery({
    queryKey: [POST_BY_ID_QUERY_KEY, options],
    queryFn: () => getPostById(options),
  });
}
