import { headers } from "next/headers";

export async function getApiUrl(path: string) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}${path}`;
}