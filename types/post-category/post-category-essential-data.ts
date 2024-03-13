import { PostPreview } from '../post/post';
import { User } from '../user/user';

export type PostCategoryEssentialData = {
  id: number;
  title: string;
  contentCount: number;
  thumbnail: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  posts: PostPreview[];
};

export type PostCategory = PostCategoryEssentialData & {
  description: string;
};
