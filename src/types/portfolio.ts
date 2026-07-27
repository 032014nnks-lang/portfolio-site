export type Work = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};
