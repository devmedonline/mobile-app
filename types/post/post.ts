import { User } from '../user/user';

export type PostPreview = {
  id: number;
  title: string;
  thumbnail: string;
  readingTime: number;
  locale: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = PostPreview & {
  content: string;
  tags: string[];
};
