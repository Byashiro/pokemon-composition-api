import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/router';
import { createPinia } from 'pinia';

import './css/style.css';
import './css/animation.css';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        present: Aura
    }
});
app.mount('#app');

// createApp(App)
//     .use(pinia)
//     .use(router)
//     .mount('#app')