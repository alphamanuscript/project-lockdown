import Vue from 'vue'
import App from './app.vue'
import './register-service-worker'
import router from './router'
import store from './store'
import './configure-api'
import './scss/base.scss'
import { LoaderPlugin } from 'vue-google-login'
import { GOOGLE_CLIENT_ID } from './api-urls'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(LoaderPlugin, {
  // eslint-disable-next-line
  client_id: GOOGLE_CLIENT_ID
});

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
