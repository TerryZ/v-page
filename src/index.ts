import { ref } from 'vue'
import type { App, Plugin } from 'vue'

import PaginationBar from './PaginationBar'
import { EN } from './language'
import { keyOptions } from './constants'
import type { LanguageKey, PaginationGlobalOptions } from './types'

export * from './types'
export * from './PaginationCore'

const PluginSetup = () => {
  const lang = ref(EN)

  const PaginationPlugin: Plugin<[PaginationGlobalOptions?]> = {
    install(app: App, options?: PaginationGlobalOptions) {
      app.provide(keyOptions, lang)
      if (options?.language) {
        setLanguage(options.language)
      }
      if (options?.register) {
        app.component(PaginationBar.name!, PaginationBar)
      }
    }
  }
  const setLanguage = (language?: LanguageKey) => {
    lang.value = language || EN
  }
  return { PaginationPlugin, setLanguage }
}

const { PaginationPlugin, setLanguage } = PluginSetup()

export { PaginationBar, setLanguage }
export default PaginationPlugin
