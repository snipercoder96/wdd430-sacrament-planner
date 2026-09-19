import { headers } from "next/headers";

export async function getApiUrl(path: string) {
  const requestHeaders = await headers(); // awaits HTTP headers from the browser
  const host = requestHeaders.get("host") ?? "localhost:3000"; // If the host is existing use the host name, otherwise localhost:3000
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http"; // Checks if it is an HTTP

  return `${protocol}://${host}${path}`;
}