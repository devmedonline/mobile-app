export const yolo = {
  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
  randomlyThrowError: (chance: number = 0.5) => {
    if (Math.random() < chance) {
      throw new Error('Random error');
    }
  },
};
