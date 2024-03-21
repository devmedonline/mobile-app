import { User } from '../user/user';

export type SimulationPreview = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'chemical' | 'physical' | 'biological';
};

export type Simulation = SimulationPreview & {
  author: User;
  initialPhase: number;
  phases: SimulationPhase[];
};

export type SimulationPhase = {
  id: number;
  title: string;
  description: string;
  order: number;
  content: string;
};
