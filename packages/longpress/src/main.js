import VoLongpress from "./longpress";

let instance = new VoLongpress();

export default {
  name: "Longpress",

  bind: (el, binding, vnode) => {
    instance.init(el, binding, vnode);

    instance.start();
  },

  unbind: (el, binding, vnode) => {
    instance.end(el, binding, vnode);
  }
};
