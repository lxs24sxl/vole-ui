import VoResize from "../packages/resize/index.js";
import VoLongpress from "../packages/longpress/index.js";

const components = [];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // eslint-disable-next-line
  if (opts) console.log("opts", opts);

  Vue.use(VoResize);
  Vue.use(VoLongpress);
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { VoResize, VoLongpress };

export default {
  version: process.env.VERSION,
  install,
  VoResize,
  VoLongpress
};
