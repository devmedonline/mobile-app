import { useQuery } from '@tanstack/react-query';
import { getModules } from './get-modules';

export const MODULES_QUERY_KEY = 'MODULES_QUERY_KEY';

export function useModulesQuery() {
  return useQuery({
    queryKey: [MODULES_QUERY_KEY],
    queryFn: getModules,
  });
}
