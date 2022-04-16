import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import viewui from '../../src/main';

const app = createApp(App);
app.use(router);
app.use(viewui);

app.mount('#app');
