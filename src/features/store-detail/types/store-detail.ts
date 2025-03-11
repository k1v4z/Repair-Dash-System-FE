export interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
}
