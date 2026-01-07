import { ref } from 'vue'
import type { App, Plugin } from 'vue'

import PaginationBar from './PaginationBar'
import { EN } from './language'
import { keyOptions } from './constants'
import type { LanguageKey, PaginationGlobalOptions } from './types'

export type * from './types'
export * from './PaginationCore'

const PluginSetup = () => {
  const lang = ref(EN)

  const install = (app: App, options: PaginationGlobalOptions = {}) => {
    app.provide(keyOptions, lang)
    if (options?.language) setLanguage(options.language)
    app.component(PaginationBar.name!, PaginationBar)
  }
  const setLanguage = (language?: LanguageKey) => {
    lang.value = language || EN
  }
  return { install, setLanguage }
}

const { install, setLanguage } = PluginSetup()

const PaginationPlugin: Plugin<PaginationGlobalOptions> = {
  install
}

export { PaginationBar, setLanguage }
export default PaginationPlugin
