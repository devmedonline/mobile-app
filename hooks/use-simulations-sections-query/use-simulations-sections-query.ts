import { useQuery } from '@tanstack/react-query';
import {
  GetSimulationsSectionsParams,
  getSimulationsSections,
} from './get-simulations-sections';

export const SIMULATIONS_SECTIONS_QUERY_KEY = 'SIMULATIONS_SECTIONS_QUERY_KEY';

export function useSimulationsSectionsQuery(
  options: GetSimulationsSectionsParams
) {
  return useQuery({
    queryKey: [SIMULATIONS_SECTIONS_QUERY_KEY, options],
    queryFn: () => getSimulationsSections(options),
    initialData: [],
  });
}
