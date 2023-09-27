import { createApp } from "vue";
import App from "./App.vue";

// 引入路由
import Router from "./routers/index";

// 引入Vant UI
import Vant from "vant";

// 引入组件样式
import "vant/lib/index.css";

createApp(App)
.use(Router)
.use(Vant)
.mount("#app");
