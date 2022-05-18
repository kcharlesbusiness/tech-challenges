import {createApp, Directive} from 'vue'
import { createPinia } from 'pinia';
// components
import App from './App.vue'
// plugins
import Oruga from '@oruga-ui/oruga-next';
// stylesheets
import '@oruga-ui/oruga-next/dist/oruga-full.css';
import './assets/scss/main.scss';

createApp(App)
  .use(Oruga)
  .use(createPinia())
  .mount('#app');
