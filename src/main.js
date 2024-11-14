import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './routes';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VTooltip from 'v-tooltip'

const app = createApp(App);
const options = {
    position: "Top-right"
}
app.use(router);
app.use(ToastPlugin, options);
app.use(VTooltip);
app.mount('#app');

