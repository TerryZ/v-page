import { ref, type App } from 'vue'

import PaginationBar from './PaginationBar'
import { EN, type LanguageKey } from './language'
import { keyOptions } from './constants'

export type { PageInfo, PageSlotData } from './PaginationBar'
export * from './PaginationCore'

interface PaginationGlobalOptions {
  language?: string
}

const PluginSetup = () => {
  const lang = ref('en')

  PaginationBar.install = (app: App, options: PaginationGlobalOptions = {}) => {
    // TODO: 语言依赖注入
    app.provide(keyOptions, lang)
    app.component(PaginationBar.name!, PaginationBar)
  }
  const setLanguage = (language: LanguageKey) => {
    lang.value = language || EN
  }
  return { setLanguage }
}

const { setLanguage } = PluginSetup()

export { PaginationBar, setLanguage }
export default PaginationBar
