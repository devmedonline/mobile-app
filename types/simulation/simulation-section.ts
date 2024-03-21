import { SimulationPreview } from './simulation';

export type BaseSimulationSection<T extends string> = {
  id: number;
  title: string;
  type: T;
  contentCount: number;
  simulations: SimulationPreview[];
};

export type FullPanelSimulationSection = BaseSimulationSection<'full-panel'>;
export type SimplePanelSimulationSection =
  BaseSimulationSection<'simple-panel'>;
export type GridPanelSimulationSection = BaseSimulationSection<'grid-panel'>;

export type SimulationSection =
  | FullPanelSimulationSection
  | SimplePanelSimulationSection
  | GridPanelSimulationSection;
