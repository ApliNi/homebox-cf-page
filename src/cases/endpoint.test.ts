import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { CLOUDFLARE_SPEED_URL, getPingUrl, getDownloadUrl, getUploadUrl } from './endpoint'

describe('getPingUrl', () => {
  it('returns Cloudflare URL by default', () => {
    const url = getPingUrl()
    assert.match(url, new RegExp(`^${CLOUDFLARE_SPEED_URL.replace(/\./g, '\\.')}/__down\\?bytes=0&_t=\\d+$`))
  })

  it('returns Cloudflare URL when endpoint is empty or spaces', () => {
    assert.match(getPingUrl(''), new RegExp(`^${CLOUDFLARE_SPEED_URL.replace(/\./g, '\\.')}/__down\\?bytes=0&_t=\\d+$`))
    assert.match(
      getPingUrl('   '),
      new RegExp(`^${CLOUDFLARE_SPEED_URL.replace(/\./g, '\\.')}/__down\\?bytes=0&_t=\\d+$`),
    )
  })

  it('returns custom ping URL when endpoint is specified', () => {
    assert.equal(getPingUrl('https://custom.speed.test'), 'https://custom.speed.test/api/ping')
    assert.equal(getPingUrl('https://custom.speed.test/'), 'https://custom.speed.test/api/ping')
    assert.equal(getPingUrl('https://custom.speed.test/api'), 'https://custom.speed.test/api/ping')
    assert.equal(getPingUrl('https://custom.speed.test/api/'), 'https://custom.speed.test/api/ping')
  })
})

describe('getDownloadUrl', () => {
  it('returns Cloudflare URL with bytes and timestamp', () => {
    const bytes = 16 * 1024 * 1024
    const url = getDownloadUrl(bytes)
    assert.match(url, new RegExp(`^${CLOUDFLARE_SPEED_URL.replace(/\./g, '\\.')}/__down\\?bytes=${bytes}&_t=\\d+$`))
  })

  it('returns custom download URL with count', () => {
    const bytes = 16 * 1024 * 1024
    assert.equal(getDownloadUrl(bytes, 'https://example.com'), 'https://example.com/api/download?count=16')
    assert.equal(getDownloadUrl(bytes, 'https://example.com/api'), 'https://example.com/api/download?count=16')
    assert.equal(getDownloadUrl(bytes, 'https://example.com/api/', 32), 'https://example.com/api/download?count=32')
  })
})

describe('getUploadUrl', () => {
  it('returns Cloudflare URL by default', () => {
    assert.equal(getUploadUrl(), `${CLOUDFLARE_SPEED_URL}/__up`)
    assert.equal(getUploadUrl(''), `${CLOUDFLARE_SPEED_URL}/__up`)
    assert.equal(getUploadUrl('  '), `${CLOUDFLARE_SPEED_URL}/__up`)
  })

  it('returns custom upload URL when endpoint is specified', () => {
    assert.equal(getUploadUrl('https://example.com'), 'https://example.com/api/upload')
    assert.equal(getUploadUrl('https://example.com/'), 'https://example.com/api/upload')
    assert.equal(getUploadUrl('https://example.com/api'), 'https://example.com/api/upload')
    assert.equal(getUploadUrl('https://example.com/api/'), 'https://example.com/api/upload')
  })
})
