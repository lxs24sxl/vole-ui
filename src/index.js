import Resize from "../packages/resize/index.js";
import VoButton from "../packages/button/index.js";

const components = [VoButton];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // eslint-disable-next-line
  if (opts) console.log("opts", opts);

  Vue.use(Resize);
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { Resize, VoButton };

export default {
  version: process.env.VERSION,
  install,
  Resize,
  VoButton
};
