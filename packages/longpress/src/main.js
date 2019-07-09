import VoLongpress from "./longpress";

import { getAttributeMap } from "vole-ui/utils/attributes";

let instance = null;

const attributes = {
  duration: {
    type: String,
    default: 400
  }
};

export default {
  name: "Longpress",

  bind: (el, binding, vnode) => {
    const { duration } = getAttributeMap(
      el,
      vnode,
      attributes,
      "vue-longpress"
    );

    instance = new VoLongpress({ el, binding, vnode, duration });

    instance.start();
  },

  unbind: (el, binding, vnode) => {
    instance.end(el, binding, vnode);
  }
};
