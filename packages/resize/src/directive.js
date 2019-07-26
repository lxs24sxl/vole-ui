import {
  addResizeListener,
  removeResizeListener
} from "../../../src/utils/resize-event";

import { getAttributeMap } from "../../../src/utils/attributes";

import { throttle, debounce } from "throttle-debounce";

const resizeDirective = {};

// const scope = "VoResize";
const attributes = {
  delay: {
    type: String,
    default: 400
  },
  type: {
    type: String,
    default: "none" // 'none'|| 'throttle' || 'debounce'
  }
};

resizeDirective.install = Vue => {
  if (Vue.prototype.$isServer) return;

  Vue.directive("resize", {
    inserted: function(el, binding, vnode) {
      const cb = binding.value;

      vnode.isInit = true;
      vnode.elmRect = {};
      const { delay, type } = getAttributeMap(
        el,
        vnode,
        attributes,
        "vue-resize"
      );

      vnode.callback = function() {
        const done = function() {
          if (this.isInit) {
            this.isInit = false;
            return;
          }
          const elmRect = JSON.parse(
            JSON.stringify(this.elm.getClientRects()[0])
          );
          if (elmRect) {
            cb(this.elm, elmRect, this.elmRect);
            vnode.elmRect = elmRect;
          }
        }.bind(vnode);

        switch (type) {
          case "debounce":
            return debounce(delay, false, done);

          case "throttle":
            return throttle(delay, false, done);

          default:
            return done;
        }
      }.bind(vnode);

      if (!binding.modifiers || !binding.modifiers.quiet) {
        if (vnode.isInit) {
          vnode.isInit = false;
          vnode.callback();
        }
      }
      addResizeListener(el, vnode.callback());
    },

    unbind: function(el, binding, vnode) {
      removeResizeListener(
        el,
        vnode.callback ? vnode.callback() : function() {}
      );
    }
  });
};

export default resizeDirective;
