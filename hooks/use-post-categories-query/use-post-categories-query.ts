import { useQuery } from '@tanstack/react-query';
import {
  GetPostCategoriesParams,
  getPostCategories,
} from './get-post-categories';

export const POST_CATEGORIES_QUERY_KEY = 'POST_CATEGORIES_QUERY_KEY';

export function usePostCategoriesQuery(options: GetPostCategoriesParams) {
  return useQuery({
    queryKey: [POST_CATEGORIES_QUERY_KEY, options],
    queryFn: () => getPostCategories(options),
    initialData: [],
  });
}
