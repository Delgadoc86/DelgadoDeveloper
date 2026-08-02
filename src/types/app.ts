export type AppStatus = "draft" | "published" | "paused";
export type AppPlatform = "web" | "mobile";

export const APP_STATUSES: AppStatus[] = ["draft", "published", "paused"];
export const APP_PLATFORMS: AppPlatform[] = ["web", "mobile"];

export interface AppRecord {
  slug: string;
  name: string;
  version: string;
  downloadUrl: string;
  status: AppStatus;
  platform: AppPlatform;
  updatedAt: string;
  updatedBy: string;
}
