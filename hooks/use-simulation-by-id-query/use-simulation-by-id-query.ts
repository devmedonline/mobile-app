import { useQuery } from '@tanstack/react-query';
import {
  GetSimulationByIdParams,
  getSimulationById,
} from './get-simulation-by-id';

export const SIMULATION_BY_ID_QUERY_KEY = 'SIMULATION_BY_ID_QUERY_KEY';

export function useSimulationByIdQuery(options: GetSimulationByIdParams) {
  return useQuery({
    queryKey: [SIMULATION_BY_ID_QUERY_KEY, options],
    queryFn: () => getSimulationById(options),
  });
}
