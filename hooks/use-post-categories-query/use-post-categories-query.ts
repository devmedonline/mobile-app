import { useQuery } from '@tanstack/react-query';
import { getPostCategories } from './get-post-categories';

export const POST_CATEGORIES_QUERY_KEY = 'POST_CATEGORIES_QUERY_KEY';

export function usePostCategoriesQuery() {
  return useQuery({
    queryKey: [POST_CATEGORIES_QUERY_KEY],
    queryFn: getPostCategories,
  });
}
