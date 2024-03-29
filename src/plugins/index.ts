// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import Notifications from '@kyvg/vue3-notification'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Notifications)
}
