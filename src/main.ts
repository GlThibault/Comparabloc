import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "simpledotcss/simple.min.css";
import "vue-select/dist/vue-select.css";

createApp(App).use(store).use(router).mount("#app");
