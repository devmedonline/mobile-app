import { PostSubCategoryEssentialData } from '../post-subcategory/post-subcategory';
import { User } from '../user/user';

export type PostCategoryEssentialData = {
  id: number;
  title: string;
  contentCount: number;
  thumbnail: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCategory = PostCategoryEssentialData & {
  subPostCategories: PostSubCategoryEssentialData[];
  description: string;
};
