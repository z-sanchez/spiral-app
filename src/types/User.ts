export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  record: {
    wins: number;
    loses: number;
  };
  coins: number;
};
