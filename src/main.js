import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './routes';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VTooltip from 'v-tooltip';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  })

const options = {
    position: "Top-right"
}
app.use(router);
app.use(ToastPlugin, options);
app.use(VTooltip);
app.use(vuetify);
app.mount('#app');

