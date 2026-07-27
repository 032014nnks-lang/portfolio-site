import { createClient } from "microcms-js-sdk";
import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";
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

type WorkContent = MicroCMSDate & {
  id: string;
  title?: string;
  contents?: MicroCMSImage;
  updated?: string;
};

const toWork = (content: WorkContent): Work => {
  const image = content.contents;

  if (!image) {
    throw new Error(`作品「${content.id}」に画像フィールドが設定されていません。`);
  }

  return {
    id: content.id,
    title: content.title ?? "Untitled Work",
    image: {
      url: image.url,
      width: image.width,
      height: image.height,
      alt: content.title,
    },
    createdAt: content.createdAt,
    updatedAt: content.updated ?? content.updatedAt,
    publishedAt: content.publishedAt,
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
      orders: "-updated",
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
