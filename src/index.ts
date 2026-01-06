import { ref } from 'vue'
import type { App, Plugin } from 'vue'

import PaginationBar from './PaginationBar'
import { EN } from './language'
import { keyOptions } from './constants'
import type { LanguageKey, PaginationGlobalOptions } from './types'

export type * from './types'
export * from './PaginationCore'

const PluginSetup = () => {
  const lang = ref('en')

  const install = (app: App, options: PaginationGlobalOptions = {}) => {
    // TODO: 语言依赖注入
    app.provide(keyOptions, lang)
    if (options?.language) setLanguage(options.language)
    app.component(PaginationBar.name!, PaginationBar)
  }
  const setLanguage = (language?: LanguageKey) => {
    lang.value = language || EN
    console.log('global:', lang.value)
  }
  return { install, setLanguage }
}

const { install, setLanguage } = PluginSetup()

PaginationBar.install = install

const PaginationPlugin: Plugin = {
  install
}

export { PaginationBar, setLanguage }
export default PaginationPlugin
