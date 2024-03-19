export type SimulationPreview = {
  id: number;
  title: string;
  thumbnail: string;
  contentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BaseSimulationSection<T extends string> = {
  id: number;
  title: string;
  type: T;
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
