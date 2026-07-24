import { sampleWorks } from "../data/sampleWorks";
import { getWorks } from "./microcms";
import type { Work } from "../types/portfolio";

export function hasMicroCMSConfig() {
  return Boolean(import.meta.env.MICROCMS_SERVICE_DOMAIN && import.meta.env.MICROCMS_API_KEY);
}

export async function loadWorks(): Promise<Work[]> {
  if (!hasMicroCMSConfig()) {
    return sampleWorks;
  }

  return getWorks();
}
