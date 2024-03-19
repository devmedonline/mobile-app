import {
  SimulationPreview,
  SimulationSection,
} from '@/types/simulation/simulation-section';
import { yolo } from '@/utils/yolo';

export type GetSimulationsSectionsParams = {
  page?: number;
  pageSize?: number;
  query?: string;
};

const fakeDataGenSimulations = (count: number) => {
  return yolo.range(1, 5).map((i) => {
    const sim: SimulationPreview = {
      id: i,
      contentCount: 10,
      createdAt: yolo.faker.date.past(),
      thumbnail: yolo.faker.image.urlPicsumPhotos({
        height: 200,
        width: 300,
      }),
      title: yolo.faker.lorem.words(3),
      updatedAt: yolo.faker.date.recent(),
    };

    return sim;
  });
};

const fakeData: SimulationSection[] = [
  {
    type: 'full-panel',
    id: 1,
    title: 'Simulações mais interessantes',
    simulations: fakeDataGenSimulations(5),
  },
  {
    type: 'simple-panel',
    id: 2,
    title: 'Simulações mais recentes',
    simulations: fakeDataGenSimulations(5),
  },
  {
    type: 'grid-panel',
    id: 3,
    title: 'Simulações mais populares',
    simulations: fakeDataGenSimulations(5),
  },
  {
    type: 'grid-panel',
    id: 4,
    title: 'Simulações menos usadas',
    simulations: fakeDataGenSimulations(5),
  },
];

export async function getSimulationsSections(
  params: GetSimulationsSectionsParams
): Promise<SimulationSection[]> {
  // await yolo.sleep(1000);
  // yolo.randomlyThrowError();

  return fakeData.filter((section) => {
    if (typeof params.query === 'string' && params.query.length > 0) {
      return section.simulations.some((sim) =>
        sim.title.includes(params.query as string)
      );
    }

    return true;
  });
}
