import { createApp } from "vue";
import { createPinia } from "pinia";
import { capitalizePlugin } from "./common/plugins";
import { router } from "@/router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(capitalizePlugin);

app.mount("#app");
