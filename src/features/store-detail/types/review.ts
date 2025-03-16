export type Review = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
};
