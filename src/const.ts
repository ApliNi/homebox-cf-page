import { Config, SpeedMode, RateUnit, Theme } from './types'
import { normalizeLocale } from './i18n'

export const API_BASE_URL = '/api'
export const CONFIG_STORAGE_KEY = 'homebox:config'

const systemLocale = typeof navigator !== 'undefined' ? normalizeLocale(navigator.language) : normalizeLocale()

interface MatchMediaHolder {
  matchMedia(query: string): { matches: boolean }
}

const systemTheme = (() => {
  if (typeof globalThis !== 'undefined' && 'matchMedia' in globalThis) {
    const holder = globalThis as unknown as MatchMediaHolder
    if (typeof holder.matchMedia === 'function') {
      const ret = holder.matchMedia('(prefers-color-scheme: dark)')
      if (ret.matches) {
        return Theme.Dark
      }
    }
  }

  return Theme.Light
})()

export const DEFAULT_CONFIG: Config = {
  duration: 10 * 1000,
  threadCount: 1,
  speedMode: SpeedMode.LOW,
  packCount: 64,
  parallel: 3,
  unit: RateUnit.BIT,
  theme: systemTheme,
  locale: systemLocale,
  endpoint: '',
}
