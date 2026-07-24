import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage } from "microcms-js-sdk";
import type { Work } from "../types/portfolio";

const worksEndpoint = "addcontents";
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

export const microcmsClient =
  serviceDomain && apiKey
    ? createClient({
        serviceDomain,
        apiKey,
      })
    : undefined;

type WorkContent = Partial<Work> & {
  id: string;
  contents?: MicroCMSImage;
};

const toWork = (content: WorkContent): Work => {
  const thumbnail = content.thumbnail ?? content.contents;

  if (!thumbnail) {
    throw new Error(`作品「${content.id}」に画像フィールドが設定されていません。`);
  }

  return {
    id: content.id,
    title: content.title ?? "Untitled Work",
    slug: content.slug ?? content.id,
    thumbnail,
    images: content.images?.length ? content.images : [thumbnail],
    category: content.category,
    description: content.description,
    year: content.year,
    order: content.order,
  };
};

export async function getWorks(): Promise<Work[]> {
  if (!microcmsClient) {
    throw new Error("microCMSの環境変数が設定されていません。");
  }

  const response = await microcmsClient.getList<WorkContent>({
    endpoint: worksEndpoint,
    queries: {
      limit: 100,
      orders: "order",
    },
  });

  return response.contents.map(toWork);
}

export async function getWorkById(contentId: string): Promise<Work> {
  if (!microcmsClient) {
    throw new Error("microCMSの環境変数が設定されていません。");
  }

  const content = await microcmsClient.getListDetail<WorkContent>({
    endpoint: worksEndpoint,
    contentId,
  });

  return toWork(content);
}
