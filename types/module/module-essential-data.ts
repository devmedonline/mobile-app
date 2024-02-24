import { User } from '../user/user';

export type ModuleEssentialData = {
  id: number;
  title: string;
  contentCount: number;
  thumbnail: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
