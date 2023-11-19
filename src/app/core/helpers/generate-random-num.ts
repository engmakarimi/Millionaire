export const generateRandomNumber = (rang: number) => {
  const result: number[] = [];
  while (true) {
    let random = Math.floor(Math.random() * rang);
    if (!result.includes(random)) {
      result.push(random);
    } else {
      Math.floor(Math.random() * rang);
    }
    if (result.length === 5) {
      break;
    }
  }
  return [...result];
};
