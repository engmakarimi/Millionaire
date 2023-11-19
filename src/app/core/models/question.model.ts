export type Question = {
  id: number;
  question: string;
  options: [
    {
      text: string;
      value: boolean;
      score: number;
    }
  ];
};
