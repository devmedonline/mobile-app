import { PostPreview } from '../post/post';
import { User } from '../user/user';

export type PostSubCategoryEssentialData = {
  id: number;
  title: string;
  contentCount: number;
  contentPreview: PostPreview[];
  thumbnail: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
