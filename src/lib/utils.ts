import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a CORS proxy URL using allorigins.win
 * @param url - The original URL to proxy
 * @returns A proxied URL that bypasses CORS restrictions
 */
export function createCorsProxyUrl(url: string): string {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
}
