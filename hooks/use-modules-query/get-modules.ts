import { ModuleEssentialData } from '@/types/module/module-essential-data';
import { yolo } from '@/utils/yolo';

export async function getModules(): Promise<ModuleEssentialData[]> {
  await yolo.sleep(3000);
  yolo.randomlyThrowError(0.1);

  return new Array(20).fill(null).map((_, i) => ({
    id: i,
    title: `Módulo lorem ipsum dolor sit amet ${i + 1}`,
    contentCount: 5,
    thumbnail: `https://picsum.photos/200/200?random=${i}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: 1,
      name:
        ['João', 'Maria', 'José', 'Ana'][i % 4] +
        ' ' +
        ['Silva', 'Santos', 'Oliveira', 'Souza'][i % 4],
      avatar: `https://picsum.photos/30/30?random=${i}`,
      createdAt: new Date(),
      email: 'example@email.com',
    },
  }));
}
