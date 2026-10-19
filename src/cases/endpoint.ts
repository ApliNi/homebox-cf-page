export const CLOUDFLARE_SPEED_URL = 'https://speed.cloudflare.com'

function getCustomBaseUrl(endpoint?: string): string | null {
  const trimmed = endpoint?.trim().replace(/\/+$/, '')
  if (!trimmed) {
    return null
  }
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

export function getPingUrl(endpoint?: string): string {
  const base = getCustomBaseUrl(endpoint)
  if (base) {
    return `${base}/ping`
  }
  return `${CLOUDFLARE_SPEED_URL}/__down?bytes=0&_t=${Date.now()}`
}

export function getDownloadUrl(bytes: number, endpoint?: string, count?: number): string {
  const base = getCustomBaseUrl(endpoint)
  if (base) {
    const packCount = count ?? Math.max(1, Math.round(bytes / (1024 * 1024)))
    return `${base}/download?count=${packCount}`
  }
  return `${CLOUDFLARE_SPEED_URL}/__down?bytes=${bytes}&_t=${Date.now()}`
}

export function getUploadUrl(endpoint?: string): string {
  const base = getCustomBaseUrl(endpoint)
  if (base) {
    return `${base}/upload`
  }
  return `${CLOUDFLARE_SPEED_URL}/__up`
}
