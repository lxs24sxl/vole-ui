import Resize from "./src/main.js";
import directive from "./src/directive.js";

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.component(Resize.name, Resize);
  },
  directive
};
