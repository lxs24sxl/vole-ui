<template>
  <div class="vo-resize">
    <slot></slot>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from "../../../src/utils/resize-event";
import { throttle, debounce } from "throttle-debounce";

export default {
  name: "VoResize",

  props: {
    /**
     * 立即触发事件
     */
    immediate: {
      type: Boolean,
      default: true
    },

    type: {
      type: String,
      default: "none", // 'none'/'throttle'/'debounce'
      validator: function(value) {
        return ["none", "throttle", "debounce"].includes(value);
      }
    },

    delay: {
      type: [String, Number],
      default: 400 // Does not take effect when the type is empty
    }
  },

  data() {
    return {
      rect: {},
      isInit: true
    };
  },

  methods: {
    getElm() {
      try {
        const __slots = this.$slots;
        if (__slots.default.length === 1) {
          const elm = __slots.default[0].elm;
          return elm;
        } else {
          throw new Error("More than 1 child node");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },

    /**
     * 获取尺寸
     */
    setRect() {
      const done = function() {
        if (this.isInit && !this.immediate) {
          this.isInit = false;
          return;
        }

        const elm = this.getElm();

        if (elm) {
          const elmRect = JSON.parse(JSON.stringify(elm.getClientRects()[0]));
          this.$emit("resize", elm, elmRect, this.rect);
          this.rect = elmRect;
        }
      }.bind(this);

      switch (this.type) {
        case "none":
          return done;

        case "throttle":
          return throttle(this.delay, false, done);

        case "debounce":
          return debounce(this.delay, false, done);

        default:
          return done;
      }
    }
  },

  mounted() {
    addResizeListener(this.getElm(), this.setRect());
  },

  beforeDestroy() {
    removeResizeListener(this.getElm(), this.setRect());
  }
};
</script>
