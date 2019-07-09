import { on, once, off } from "vole-ui/utils/dom";

/**
 * 构造函数
 * @param {Object} conf 配置
 */
function VoLongpress(conf = {}) {
  this.duration = conf.duration || 2000;
  this.startStamp = 0;
  this.endStamp = 0;
  this.handler = function() {};
  this.interval = null;
  this.el = conf.el;
  this.binding = conf.binding;
  this.vnode = conf.vnode;
}

/**
 * 初始化指令
 */
VoLongpress.prototype.init = function(el, binding, vnode) {
  this.el = el;
  this.binding = binding;
  this.vnode = vnode;
  this.startStamp = 0;
  this.endStamp = 0;
};

/**
 * 开始执行事件
 */
VoLongpress.prototype.start = function() {
  let { el, binding, vnode } = this;

  if (el.cancelBubble && ++el.cancelBubbleCount > 1) return;

  this.handler = args => vnode.context[binding.expression].call(this, args);

  on(el, "mousedown", this.mousedownEvent.bind(this));
};

/**
 * 鼠标按下事件
 */
VoLongpress.prototype.mousedownEvent = function() {
  this.startStamp = Date.now();

  const clear = this.clear.bind(this);

  this.interval = setInterval(() => {
    this.update();

    let { endStamp, startStamp, duration } = this;

    if (endStamp - startStamp >= duration) {
      clear();
      this.handler({
        startStamp,
        endStamp,
        rangeOfTime: endStamp - startStamp
      });
    }
  }, 100);

  once(this.el, "mouseup", clear);
};

/**
 * 清除定时
 */
VoLongpress.prototype.clear = function() {
  clearInterval(this.interval);
  this.interval = null;
};

/**
 * 更新结束时间
 */
VoLongpress.prototype.update = function() {
  this.endStamp = Date.now();
};

/**
 * 结束执行事件
 */
VoLongpress.prototype.end = function(elemenet) {
  let { el } = this;
  const clear = this.clear.bind(this);

  off(el || elemenet, "mousedown", clear);
  off(el || elemenet, "mouseup", clear);
};

export default VoLongpress;
