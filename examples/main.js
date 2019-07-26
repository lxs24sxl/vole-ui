import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { VoResize, VoLongpress } from "../lib/rollup/index-bundle";
console.log("VoleUI", VoResize, VoLongpress);
Vue.use(VoResize);
Vue.use(VoLongpress);
// import VoButton from 'vole-ui/lib/'
new Vue({
  render: h => h(App)
}).$mount("#app");
