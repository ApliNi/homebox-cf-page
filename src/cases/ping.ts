import { getPingUrl } from './endpoint'

export const ping = async (endpoint?: string) => {
  const now = performance.now()
  const resp = await fetch(getPingUrl(endpoint), { method: 'HEAD' })

  // we calculate time before consuming the response
  const time = performance.now() - now

  // some bad browsers that will memory leak if we don't consume the response
  await resp.arrayBuffer()

  return time
}
