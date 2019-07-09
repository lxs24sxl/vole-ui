# vole-ui
A Vue.js 2.0 Easy UI Toolkit for Web


## Install
```shell
npm install vole-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import VoleUI from 'vole-ui'

Vue.use(VoleUI)
```

## Components

### 1. Resize (directive and component) （[Document](https://github.com/lxs24sxl/vole-ui/blob/master/examples/docs/zh-CN/resize.md)）

```html
<template>
  <div class="test-wrap">
    <vo-resize 
      @resize="handleResizeEvent" 
      :immediate="false"
      :delay="500"
      :type="throttle">
      <div>{{rect}}</div>
    </vo-resize>

    <div 
      v-resize.quiet="handleResizeEvent" 
      vue-resize-delay="600" 
      vue-resize-type="debounce">
      {{rect}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Test extends Vue {
  rect = {};

  oldRect = {};

  handleResizeEvent (el, rect, oldRect) {
    this.rect = rect
    this.oldRect = oldRect
  }
}
</script>
```


### 2. Longpress (directive) （[Document](https://github.com/lxs24sxl/vole-ui/blob/master/examples/docs/zh-CN/longpress.md)）

```html
<template>
  <div class="test-wrap">
    <button 
      v-longpress="handleLongpressEvent"
      vue-longpress-duration="1000">
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Test extends Vue {
  options = {
    endStamp: 1562638917679,
    rangeOfTime: 1001,
    startStamp: 1562638916678
  }

  handleLongpressEvent (options) {
    this.options = options
  }
}
</script>
```
