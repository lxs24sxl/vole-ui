import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VoleUI from "vole-ui";
Vue.use(VoleUI);
// import VoButton from 'vole-ui/lib/'
new Vue({
  render: h => h(App)
}).$mount("#app");
