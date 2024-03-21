import { faker } from '@faker-js/faker';

export const yolo = {
  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
  randomlyThrowError: (chance: number = 0.5) => {
    if (Math.random() < chance) {
      throw new Error('Random error');
    }
  },
  range: (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  },
  randomBoolean: () => Math.random() < 0.5,
  randomInt: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  randomChoice: <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  },
  faker,
};
