import {
  addResizeListener,
  removeResizeListener
} from "vole-ui/utils/resize-event";
import { isHtmlElement, isUndefined, isDefined } from "vole-ui/utils/types";
import { throttle, debounce } from "throttle-debounce";

const resizeDirective = {};

const entries = obj => {
  return Object.keys(obj || {}).map(key => [key, obj[key]]);
};

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

const getResizeOptions = (el, vm) => {
  if (!isHtmlElement(el)) return {};

  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;

    let value = el.getAttribute(`vue-resize-${key}`);

    value = isUndefined(vm[value]) ? value : vm[value];

    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;

      case Boolean:
        value = isDefined(value)
          ? value === "false"
            ? false
            : Boolean(value)
          : defaultValue;
        break;

      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};

resizeDirective.install = Vue => {
  if (Vue.prototype.$isServer) return;

  Vue.directive("resize", {
    inserted: function(el, binding, vnode) {
      const cb = binding.value;

      vnode.isInit = true;
      vnode.elmRect = {};
      const { delay, type } = getResizeOptions(el, vnode);

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
