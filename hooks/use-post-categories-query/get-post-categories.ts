import { PostCategoryEssentialData } from '@/types/post-category/post-category-essential-data';
import { PostPreview } from '@/types/post/post';
import { yolo } from '@/utils/yolo';

export async function getPostCategories(): Promise<
  PostCategoryEssentialData[]
> {
  await yolo.sleep(3000);
  yolo.randomlyThrowError(0.1);

  const postPreviewList: PostPreview[] = yolo.range(1, 10).map((i) => ({
    id: i,
    title: yolo.faker.lorem.words(6),
    author: {
      id: i,
      name: yolo.faker.person.fullName(),
      avatar: yolo.faker.image.avatar(),
      createdAt: yolo.faker.date.past(),
      email: yolo.faker.internet.email(),
    },
    createdAt: yolo.faker.date.past(),
    locale: 'pt-br',
    readingTime: yolo.randomInt(5, 25),
    thumbnail: yolo.faker.image.urlPicsumPhotos({ width: 640, height: 360 }),
    updatedAt: yolo.faker.date.recent(),
  }));

  const result: PostCategoryEssentialData[] = yolo.range(1, 10).map((i) => ({
    id: i,
    title: yolo.faker.lorem.words(6),
    posts: postPreviewList,
    author: {
      id: i,
      name: yolo.faker.person.fullName(),
      avatar: yolo.faker.image.avatar(),
      createdAt: yolo.faker.date.past(),
      email: yolo.faker.internet.email(),
    },
    createdAt: yolo.faker.date.past(),
    updatedAt: yolo.faker.date.recent(),
    contentCount: yolo.randomInt(1, 100),
    thumbnail: yolo.faker.image.urlPicsumPhotos({ width: 640, height: 360 }),
  }));

  return result;
}
