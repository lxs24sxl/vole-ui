import Resize from "../packages/resize/index.js";

const components = [];

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

export default {
  version: "0.1.0",
  install,
  Resize
};
