import type { MicroCMSImage } from "microcms-js-sdk";

export type Work = {
  id: string;
  title: string;
  slug: string;
  thumbnail: MicroCMSImage;
  images: MicroCMSImage[];
  category?: string;
  description?: string;
  year?: string;
  order?: number;
};
